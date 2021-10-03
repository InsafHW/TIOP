const MAX_CHANNEL = 99
const MIN_CHANNEL = 1

class TV {
  #m_isTurned = false
  #m_currentChannel = 0
  #m_history = []
  #m_channelNames = new Map()
  #m_channelNumbers = new Map()

  IsTurnedOn() {
    return this.#m_isTurned
  }

  GetCurrentChannel() {
    return this.#m_currentChannel
  }

  GetTvHistory() {
    return this.#m_history
  }

  /**
   * @param {number} channel
   */
  GetChannelName(channel) {
    const name = this.#m_channelNames.get(channel)
    if (!this.#m_isTurned || channel < MIN_CHANNEL || channel > MAX_CHANNEL || !name) {
      return ''
    }
    return name
  }

  /**
   * @param {string} name
   */
  GetChannelByName(name) {
    const number = this.#m_channelNumbers.get(name)
    if (!this.#m_isTurned || !number) {
      return -1
    }
    return number
  }

  TurnOn() {
    if (this.#m_isTurned) {
      return false
    }
    this.#m_isTurned = true
    if (this.#m_history.length) {
      this.#m_currentChannel = this.#m_history[this.#m_history.length - 1]
    } else {
      this.#m_currentChannel = 1
      this.#m_history.push(1)
    }
    return true
  }

  TurnOff() {
    if (this.#m_isTurned) {
      this.#m_isTurned = false
      this.#m_currentChannel = 0
      return true
    }
    return false
  }

  /**
   * @param {number} channel
   */
  SelectChannel(channel) {
    if (!this.#m_isTurned || channel > MAX_CHANNEL || channel < MIN_CHANNEL) {
      return false
    }
    this.#m_currentChannel = channel
    this.#m_history.push(channel)
    return true
  }

  /**
   * @param {number} number
   * @param {string} name
   */
  SetChannelName(number, name) {
    if (!this.#m_isTurned || number > MAX_CHANNEL || number < MIN_CHANNEL || name === '') {
      return false
    }
    const associationNumber = this.#m_channelNumbers.get(name)

    this.#m_channelNumbers.delete(name)
    this.#m_channelNames.delete(associationNumber)

    this.#m_channelNames.set(number, name)
    this.#m_channelNumbers.set(name, number)
    return true
  }

  SelectPreviousChannel() {
    if (!this.#m_isTurned || this.#m_history.length <= 1) {
      return false
    }
    this.#m_currentChannel = this.#m_history[this.#m_history.length - 2]
    this.#m_history.pop()
    return true
  }
}

module.exports = {
  TV,
  MAX_CHANNEL,
  MIN_CHANNEL
}