// Calculate token count
export const calculateTokenCount = (text: string): number => {
  // Simple approximation: 1 token ≈ 4 characters
  // For production, use tiktoken or similar
  return Math.ceil(text.length / 4);
};
