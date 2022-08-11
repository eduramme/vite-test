test('should return 10 users', () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then(data => {
      expect(data.length).toBe(10)
    })
})