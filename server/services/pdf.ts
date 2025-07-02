export function generatePersonaPDF(persona: any): string {
  // Simple PDF generation - in a real implementation, you'd use a proper PDF library
  return `data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZQo+PgplbmRvYmoKeHJlZgowIDMKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAzCi9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgoxMjgKJSVFT0Y=`;
}

export function generatePersonaJSON(persona: any): string {
  return JSON.stringify(persona, null, 2);
}

export function generateShareLink(personaId: number): string {
  return `${process.env.BASE_URL || 'http://localhost:5000'}/persona/${personaId}`;
}
