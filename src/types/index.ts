export interface Currency {
  short_code: string
  name: string
}

export interface ConvertResult {
  amount: number
  rate: number
  result: number
}
