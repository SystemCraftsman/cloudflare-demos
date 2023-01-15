import logging
import sys
import boto3
from botocore.exceptions import ClientError
import os

client = boto3.client(
    's3',
    endpoint_url = 'https://<S3_ENDPOINT_URL>',
    aws_access_key_id = '<YOUR_R2_ACCESS_KEY_ID',
    aws_secret_access_key = '<YOUR_R2_SECRET_ACCESS_KEY>'
)

def upload_file(file_name, bucket_name, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    try:
        client.upload_file(file_name, bucket_name, object_name)
        _list_objects(bucket_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

def _list_objects(bucket_name):
    for object in client.list_objects(Bucket=bucket_name)['Contents']:
        print(object['Key'])

def main(file_name):
    upload_file(file_name, "pics")

if __name__ == "__main__":
   main(sys.argv[1])
