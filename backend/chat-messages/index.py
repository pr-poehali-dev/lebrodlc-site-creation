import json
import os
from typing import Dict, Any, List
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление сообщениями чата (сохранение и получение)
    Args: event с httpMethod, body, queryStringParameters
    Returns: HTTP response с сообщениями
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            user_message = body_data.get('message', '')
            session_id = body_data.get('session_id', 'anonymous')
            
            cursor.execute('''
                INSERT INTO chat_messages (session_id, message, is_user, created_at)
                VALUES (%s, %s, %s, NOW())
                RETURNING id, session_id, message, is_user, created_at
            ''', (session_id, user_message, True))
            
            saved_message = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'message': dict(saved_message)
                }, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            session_id = params.get('session_id', 'anonymous')
            
            cursor.execute('''
                SELECT id, session_id, message, is_user, admin_reply, created_at, replied_at
                FROM chat_messages
                WHERE session_id = %s
                ORDER BY created_at ASC
            ''', (session_id,))
            
            messages = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'messages': [dict(msg) for msg in messages]
                }, default=str),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
