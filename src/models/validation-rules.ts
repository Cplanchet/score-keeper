export interface ValidationRule {
  message: string,
  validate: (value: any) => boolean
}

export class ValidateGreaterThan implements ValidationRule {
  public message: string
  constructor(private amount: number, message?: string) {
    this.message = message ?? `Must be greater than ${amount}`
  }

  validate(value: any) {
    if (value === null) return true
    if (typeof value !== "number") {
      return false
    }

    return value > this.amount
  }
}

export class ValidateLessThan implements ValidationRule {
  public message: string
  constructor(private amount: number, message?: string) {
    this.message = message ?? `Must be less than ${amount}`
  }

  validate(value: any) {
    if (value === null) {
      return true
    }
    if (typeof value !== "number") {
      return false
    }

    return value < this.amount
  }
}

export class ValidateBetween implements ValidationRule {
  public message: string
  constructor(private lowerAmount: number, private greaterAmount: number, message?: string) {
    this.message = message ?? `Must be between ${lowerAmount} and ${greaterAmount}`
  }

  validate(value: any) {
    if (value === null) {
      return true
    }
    if (typeof value !== "number") {
      return false
    }

    return value <= this.greaterAmount && value >= this.lowerAmount
  }
}

export class ValidateZeroOrBetween implements ValidationRule {
  public message: string
  constructor(private lowerAmount: number, private greaterAmount: number, message?: string) {
    this.message = message ?? `Must be between ${lowerAmount} and ${greaterAmount}`
  }

  validate(value: any) {
    if (value === null || value === 0) {
      return true
    }
    if (typeof value !== "number") {
      return false
    }

    return value <= this.greaterAmount && value >= this.lowerAmount
  }
}

export class ValidateDivisibleBy implements ValidationRule {
  public message: string
  constructor(private divisor: number, message?: string) {
    this.message = message ?? `Must be divisible by ${divisor}`
  }

  validate(value: any) {
    if (value === null) {
      return true
    }
    if (typeof value !== "number") {
      return false
    }

    return value % this.divisor === 0
  }
}

export class ValidateRequired implements ValidationRule {
  public message: string
  constructor(message?: string) {
    this.message = message ?? `Field is Required`
  }

  validate(value: any) {
    if (value === null || value === undefined || value === '') {
      return false
    }
    return true
  }
}
