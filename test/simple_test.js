import SseDecoder from '../src/SseDecoder'

describe('simple', () => {
  it('should be sane', () => {
    expect(false).not.toBe(true)
  })

  it('should decode', () => {
    const eventStream = `
: this is a test stream

data: some text

data: another message
data: with two lines

event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}

event: userdisconnect
data: {"username": "bobby", "time": "02:34:23"}

event: usermessage
data: {"username": "sean", "time": "02:34:36", "text": "Bye, bobby."}

event: userconnect
data: {"username": "bobby", "time": "02:33:48"}

data: Here's a system message of some kind that will get used
data: to accomplish some task.

event: usermessage
data: {"username": "bobby", "time": "02:34:11", "text": "Hi everyone."}

`
    const decoder = new SseDecoder('http://www.example.com/some/path')
    const messages = decoder.decode(eventStream)
    expect(messages.length).toBe(9)
  })

  it('should partial', () => {
    const eventStream = `
data: some text

data: another message
data: with two lines

data: some more text

`
    const decoder = new SseDecoder('http://www.example.com/some/path')
    const firstPart = eventStream.substring(0, 20)
    const secondPart = eventStream.substring(20)
    const messages1 = decoder.decode(firstPart)
    const messages2 = decoder.decode(secondPart)
    const messages = messages1.concat(messages2)
    expect(messages.length).toBe(3)
  })
})
