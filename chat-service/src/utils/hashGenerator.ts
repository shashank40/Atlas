export function generateDeterministicId(id1: string, id2: string) {
    // Combine the IDs and sort them
    const combinedId = (id1 + id2).split('').sort().join('');
    // Generate hash
    let hash = 0;
    for (let i = 0; i < combinedId.length; i++) {
        const char = combinedId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash &= hash; // Convert to 32bit integer
    }
    return hash;
  }