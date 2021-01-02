export default (input: string) => input.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
