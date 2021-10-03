const {TV, MAX_CHANNEL, MIN_CHANNEL} = require('./TV')

describe('TurnOn method of class TV', () => {
  let tv
  beforeEach(() => {
    tv = new TV()
  })

  test('At first Tv is turned off', () => {
    expect(tv.IsTurnedOn()).toBe(false)
  })

  test('If Tv is turned off and we call TurnOn should return true, and Tv will be turned on', () => {
    expect(tv.IsTurnedOn()).toBe(false)
    expect(tv.TurnOn()).toBe(true)
    expect(tv.IsTurnedOn()).toBe(true)
  })

  test('If Tv is turned on at the first time current channel should be 1', () => {
    expect(tv.TurnOn()).toBe(true)
    expect(tv.GetCurrentChannel()).toBe(1)
  })

  test('If Tv is turned on not at the first time current channel should be what it was before it turned off', () => {
    tv.TurnOn()
    tv.SelectChannel(19)
    tv.TurnOff()
    expect(tv.TurnOn()).toBe(true)
    expect(tv.GetCurrentChannel()).toBe(19)
  })

  test('If Tv is turned on and we call TurnOn should return false, and Tv will be still turned on', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.TurnOn()).toBe(false)
    expect(tv.IsTurnedOn()).toBe(true)
  })
})

describe('TurnOff method of class TV', () => {
  let tv
  beforeEach(() => {
    tv = new TV()
  })

  test('At first Tv is turned off', () => {
    expect(tv.IsTurnedOn()).toBe(false)
  })

  test('If Tv is turned off and we call TurnOff should return false, and Tv will be still turned off', () => {
    expect(tv.IsTurnedOn()).toBe(false)
    expect(tv.TurnOff()).toBe(false)
    expect(tv.IsTurnedOn()).toBe(false)
  })

  test('If Tv is turned on and we call TurnOff should return true, and Tv will be turned off', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.TurnOff()).toBe(true)
    expect(tv.IsTurnedOn()).toBe(false)
  })
})

describe('SelectChannel method of class TV', () => {
  let tv
  beforeEach(() => {
    tv = new TV()
  })

  test('If Tv is turned off and we call SelectChannel should return false', () => {
    expect(tv.IsTurnedOn()).toBe(false)
    expect(tv.SelectChannel(4)).toBe(false)
  })

  test('If Tv is turned on and we call SelectChannel with channel that is out of available range should return false', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.SelectChannel(MIN_CHANNEL - 1)).toBe(false)
    expect(tv.SelectChannel(MAX_CHANNEL + 1)).toBe(false)
  })

  test('If Tv is turned on and we call SelectChannel with channel that is in range should return true and selected channel changes', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.SelectChannel(5)).toBe(true)
    expect(tv.GetCurrentChannel()).toBe(5)

    expect(tv.SelectChannel(10)).toBe(true)
    expect(tv.GetCurrentChannel()).toBe(10)
  })

  test('After select channel it shoud be pushed in history', () => {
    tv.TurnOn()
    expect(tv.GetTvHistory()).toEqual([1])
    expect(tv.SelectChannel(90)).toBe(true)
    expect(tv.GetTvHistory()).toEqual([1, 90])
    expect(tv.SelectChannel(37)).toBe(true)
    expect(tv.GetTvHistory()).toEqual([1, 90, 37])
  })
})

describe('SetChannelName method of class TV', () => {
  let tv
  beforeEach(() => {
    tv = new TV()
  })

  test('If Tv is turned off and we call SetChannelName should return false', () => {
    expect(tv.IsTurnedOn()).toBe(false)
    expect(tv.SetChannelName(4, 'Четвертый')).toBe(false)
  })

  test('If Tv is turned on and we call SetChannelName with channel number which is out of range should return false', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.SetChannelName(MIN_CHANNEL - 1, 'Name')).toBe(false)
    expect(tv.SetChannelName(MAX_CHANNEL + 1, 'Name')).toBe(false)
  })

  test('If Tv is turned on and we call SetChannelName with empty name string should return false and name doesnt change', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.GetChannelName(1)).toBe('')
    expect(tv.SetChannelName(1, '')).toBe(false)
    expect(tv.GetChannelName(1)).toBe('')
  })

  test('If Tv is turned on and we call SetChannelName with channel number which is in range should return true and name changes', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.SetChannelName(1, 'Первый')).toBe(true)
    expect(tv.GetChannelName(1)).toBe('Первый')

    expect(tv.SetChannelName(13, 'Пятница')).toBe(true)
    expect(tv.GetChannelName(13)).toBe('Пятница')
  })

  test('If Tv is turned on and we set channel name which was already given, previous association deletes and new name will be given', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.SetChannelName(1, 'Пятница')).toBe(true)
    expect(tv.GetChannelName(1)).toBe('Пятница')
    expect(tv.SetChannelName(13, 'Пятница')).toBe(true)
    expect(tv.GetChannelName(1)).toBe('')
    expect(tv.GetChannelName(13)).toBe('Пятница')
  })
})

describe('SelectPreviousChannel method of class TV', () => {
  let tv
  beforeEach(() => {
    tv = new TV()
  })

  test('If Tv is turned off and we call SelectPreviousChannel should return false', () => {
    expect(tv.IsTurnedOn()).toBe(false)
    expect(tv.SelectPreviousChannel()).toBe(false)
  })

  test('If Tv is turned on and history length is less than 2 should return false', () => {
    tv.TurnOn()
    expect(tv.GetCurrentChannel()).toBe(1)
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.GetTvHistory().length < 2).toBe(true)
    expect(tv.SelectPreviousChannel()).toBe(false)
    expect(tv.GetCurrentChannel()).toBe(1)
  })

  test('If Tv is turned on and history length is greater than 2 should return true and current channel changes and last number deletes from history', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.SelectChannel(9)).toBe(true)
    expect(tv.SelectChannel(11)).toBe(true)
    expect(tv.SelectChannel(98)).toBe(true)
    expect(tv.GetTvHistory().length > 2).toBe(true)
    expect(tv.GetTvHistory()).toEqual([1, 9, 11, 98])
    expect(tv.SelectPreviousChannel()).toBe(true)
    expect(tv.GetCurrentChannel()).toBe(11)
    expect(tv.GetTvHistory()).toEqual([1, 9, 11])
    expect(tv.SelectPreviousChannel()).toBe(true)
    expect(tv.GetTvHistory()).toEqual([1, 9])
    expect(tv.GetCurrentChannel()).toBe(9)
  })
})

describe('GetChannelName method of class TV', () => {
  let tv
  beforeEach(() => {
    tv = new TV()
  })

  test('If Tv is turned off and we call GetChannelName should return empty string', () => {
    expect(tv.IsTurnedOn()).toBe(false)
    expect(tv.GetChannelName(2)).toBe('')
  })

  test('If Tv is turned on and we call GetChannelName on channel that wasnt given name to should return empty string', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.GetChannelName(4)).toBe('')
  })

  test('If Tv is turned on and name was given to channel it should return the name of the channel', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.SetChannelName(4, 'Четвертый')).toBe(true)
    expect(tv.GetChannelName(4)).toBe('Четвертый')
  })
})

describe('GetChannelByName method of class TV', () => {
  let tv
  beforeEach(() => {
    tv = new TV()
  })

  test('If Tv is turned off and we call GetChannelByName should return -1', () => {
    expect(tv.IsTurnedOn()).toBe(false)
    expect(tv.GetChannelByName('Первый')).toBe(-1)
  })

  test('If Tv is turned on and the name wasnt given should return -1', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.GetChannelByName('Первый')).toBe(-1)
  })

  test('If Tv is turned on and the name was given should return channel number that the name was given to', () => {
    tv.TurnOn()
    expect(tv.IsTurnedOn()).toBe(true)
    expect(tv.SetChannelName(1, 'Первый')).toBe(true)
    expect(tv.SetChannelName(23, 'Рен-Тв')).toBe(true)
    expect(tv.GetChannelByName('Первый')).toBe(1)
    expect(tv.GetChannelByName('Рен-Тв')).toBe(23)
  })
})