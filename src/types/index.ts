export interface Currency {
  short_code: string
  name: string
  precision: number;
}

export interface ConvertResult {
  amount: number
  rate: number
  result: number
}
