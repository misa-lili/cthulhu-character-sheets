import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export async function get(table: 'sheets' | 'passwords', key: string) {
	const client = new DynamoDBClient({ region: 'ap-northeast-2' })
	const command = new GetItemCommand({
		TableName: table,
		Key: {
			key: { S: key },
		},
	})
	return client.send(command)
}

export function put(table: 'sheets' | 'passwords', key: string, value: string) {
	const client = new DynamoDBClient({ region: 'ap-northeast-2' })
	const command = new PutItemCommand({
		TableName: table,
		Item: {
			key: { S: key },
			value: { S: value },
		},
	})
	return client.send(command)
}

export async function putToImages(bucket: 'misalili-images', key: string, file: File) {
	const arrayBuffer = await file.arrayBuffer()
	const uint8ArrayData = new Uint8Array(arrayBuffer)

	const client = new S3Client({ region: 'ap-northeast-2' })
	const options = {
		Bucket: bucket,
		Key: key + '.' + file.type.split('/')[1],
		Body: uint8ArrayData,
		ContentType: file.type,
	}
	const command = new PutObjectCommand(options)
	return client.send(command)
}
