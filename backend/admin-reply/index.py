import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Админ-ответ на сообщение пользователя
    Args: event с httpMethod, body
    Returns: HTTP response
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    request_headers = event.get('headers', {})
    admin_key = request_headers.get('x-admin-key') or request_headers.get('X-Admin-Key')
    expected_key = os.environ.get('ADMIN_KEY')
    
    if not expected_key or admin_key != expected_key:
        return {
            'statusCode': 403,
            'headers': headers,
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
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
            message_id = body_data.get('message_id')
            admin_reply = body_data.get('reply', '')
            
            cursor.execute('''
                UPDATE chat_messages
                SET admin_reply = %s, replied_at = NOW()
                WHERE id = %s
                RETURNING id, session_id, message, admin_reply, replied_at
            ''', (admin_reply, message_id))
            
            updated_message = cursor.fetchone()
            conn.commit()
            
            if not updated_message:
                return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'error': 'Message not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'message': dict(updated_message)
                }, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            cursor.execute('''
                SELECT id, session_id, message, is_user, admin_reply, created_at, replied_at
                FROM chat_messages
                WHERE is_user = TRUE
                ORDER BY created_at DESC
                LIMIT 100
            ''')
            
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
