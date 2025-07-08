


export interface chunkData{
  chunkIndex : number,
  text:string,
  qdrantId:string,
  tokenCount: number,
  metadata: Record<string, any>,
  fileId: number,
  conversationId: number,
}