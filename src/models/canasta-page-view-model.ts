import { ValidateBetween, ValidateDivisibleBy, ValidateRequired, ValidationRule } from "./validation-rules";

export default class CanastaPageViewModel {

  constructor(public readonly state = CanastaPageState.default) { }

  public onMixedChange(team: CanastaTeam, value: string) {
    return this.changeFormState(team, value, "mixedCanastas")
  }

  public onNaturalChange(team: CanastaTeam, value: string) {
    return this.changeFormState(team, value, "naturalCanastas")
  }

  public onRedThreesChange(team: CanastaTeam, value: string) {
    return this.changeFormState(team, value, "redThrees")
  }

  public onMeldChange(team: CanastaTeam, value: string) {
    return this.changeFormState(team, value, "meld")
  }
  public onPointsInHandChange(team: CanastaTeam, value: string) {
    return this.changeFormState(team, value, "pointsInHand")
  }

  public onWentOutChange(team: CanastaTeam, value: boolean) {
    const newState = { us: { wentOut: false }, them: { wentOut: false } }
    newState[team].wentOut = value;

    return this.withState(this.state.copy({ formState: { us: this.state.formState.us.copy(newState.us), them: this.state.formState.them.copy(newState.them) } }))
  }

  private changeFormState(team: CanastaTeam, value: string, field: keyof CanastaFormState) {
    const parsedValue: number | null | undefined = this.parseText(value)
    if (parsedValue === undefined) {
      return this
    }
    const state = {};
    Object.defineProperty(state, field, { value: parsedValue, writable: false })
    return this.withState(this.createNewStateForFormUpdate(team, state))
  }

  private createNewStateForFormUpdate(team: CanastaTeam, newState: Partial<CanastaFormState>) {
    return this.state.copy({ formState: { [team]: this.state.formState[team].copy(newState) } })
  }

  private parseText(value: string): number | null | undefined {
    if (!value) {
      return null;
    }
    const parsed = Number.parseInt(value)
    if (Number.isNaN(parsed)) {
      return undefined
    }
    return parsed
  }

  public withState(state: CanastaPageState) {
    return new CanastaPageViewModel(state)
  }

  public onNextHand() {
    return this.withState(this.state.copy({ pageMode: CanastaPageMode.SCORE, formState: { us: CanastaFormState.default, them: CanastaFormState.default } }))
  }

  public onSaveScore() {
    const formState = {
      us: this.state.formState.us,
      them: this.state.formState.them
    }
    if (!formState.us.isValid || !formState.them.isValid) {
      return this;
    }
    const scoreState: { us?: CanastaScore, them?: CanastaScore } = {};
    ["us" as "us", "them" as "them"].map((team) => {
      Object.defineProperty(scoreState, team, {

        value: this.state.scores[team].addHand(CanastaHandScore.scoreHand({
          canastaCount: {
            mixed: formState[team].mixedCanastas!,
            natural: formState[team].naturalCanastas!
          },
          redThrees: formState[team].redThrees!,
          meld: formState[team].meld!,
          pointsInHand: formState[team].pointsInHand!,
          wentOut: formState[team].wentOut
        }))
      })

    })

    const gameOver = scoreState.us?.hasWon || scoreState.them?.hasWon;

    const winner = gameOver ? this.calculateWinner(scoreState) : null

    const pageMode = gameOver ? CanastaPageMode.WIN : CanastaPageMode.VIEW

    return this.withState(this.state.copy({ pageMode: pageMode, score: { us: scoreState.us, them: scoreState.them }, winner: winner }))
  }

  private calculateWinner(scoreState: { us?: CanastaScore, them?: CanastaScore }): "us" | "them" | null {
    if (scoreState.us?.hasWon && scoreState.us.wentOutLast) {
      return "us"
    } else if (scoreState.them?.hasWon && scoreState.them.wentOutLast) {
      return "them"
    } else if (scoreState.us?.hasWon && (scoreState.us?.score ?? 0) > (scoreState.them?.score ?? 0)) {
      return "us"
    } else if (scoreState.them?.hasWon && (scoreState.them?.score ?? 0) > (scoreState.us?.score ?? 0)) {
      return "them"
    } else {
      return null
    }
  }
}

export type CanastaTeam = "us" | "them"

export class CanastaPageState {

  private static _default?: CanastaPageState = undefined;

  private constructor(
    public scores: { us: CanastaScore, them: CanastaScore } = { us: CanastaScore.default, them: CanastaScore.default },
    public winner: "us" | "them" | null = null,
    public pageMode: CanastaPageMode = CanastaPageMode.VIEW,
    public formState: { us: CanastaFormState, them: CanastaFormState } = { us: CanastaFormState.default, them: CanastaFormState.default }
  ) { }


  public static get default() {
    return new CanastaPageState()
  }

  public copy(
    value?: {
      score?: {
        us?: CanastaScore,
        them?: CanastaScore
      },
      winner?: "us" | "them" | null
      formState?: {
        us?: CanastaFormState,
        them?: CanastaFormState
      },
      pageMode?: CanastaPageMode
    }
  ) {
    return new CanastaPageState(
      {
        us: value?.score?.us ?? this.scores.us,
        them: value?.score?.them ?? this.scores.them
      },
      value?.winner !== undefined ? value?.winner : this.winner,
      value?.pageMode ?? this.pageMode,
      {
        us: value?.formState?.us ?? this.formState.us,
        them: value?.formState?.them ?? this.formState.them
      }
    )
  }
}

export class CanastaScore {
  public readonly score: number;
  public readonly firstMeldMinimum: number;
  public readonly hasWon: boolean
  public readonly wentOutLast: boolean
  private constructor(
    public readonly hands: CanastaHandScore[] = [],
  ) {
    this.score = hands.reduce((prev: number, current: CanastaHandScore) => {
      return prev + current.totalScore
    }, 0);

    if (this.score > 3000) {
      this.firstMeldMinimum = 120
    } else if (this.score > 1500) {
      this.firstMeldMinimum = 90
    } else {
      this.firstMeldMinimum = 50
    }

    this.hasWon = this.score >= 5000;
    this.wentOutLast = hands.length > 0 ? hands[hands.length - 1].goingOutBonus === 100 : false
  }

  public static default: CanastaScore = new CanastaScore();

  public addHand(newHand: CanastaHandScore): CanastaScore {
    return new CanastaScore([...this.hands, newHand])
  }
}

export class CanastaHandScore {
  public readonly totalScore: number
  private constructor(
    public readonly canastaBonus: number = 0,
    public readonly pointsInHand: number = 0,
    public readonly redThreeScore: number = 0,
    public readonly meldScore: number = 0,
    public readonly goingOutBonus: number = 0,
  ) {
    this.totalScore = canastaBonus + redThreeScore + meldScore + goingOutBonus - pointsInHand
  }

  public static scoreHand(score: {
    canastaCount: {
      mixed?: number,
      natural?: number
    },
    redThrees: number,
    meld: number,
    wentOut: boolean,
    pointsInHand: number
  }
  ): CanastaHandScore {
    const canastaBonus = ((score.canastaCount.mixed ?? 0) * 300) + ((score.canastaCount.natural ?? 0) * 500);
    const pointsInHand = score.pointsInHand;
    const redThreeScore = score.redThrees === 4 ? score.redThrees * 200 : score.redThrees * 100;
    const meldScore = score.meld
    const goingOutBonus = score.wentOut ? 100 : 0

    return new CanastaHandScore(canastaBonus, pointsInHand, redThreeScore, meldScore, goingOutBonus)
  }
}

export enum CanastaPageMode {
  VIEW = 'view',
  SCORE = 'score',
  WIN = 'win'
}

export class CanastaFormState {
  private readonly canastaValidationRules: CanastaFormStateValidationRules[] = [
    { rule: new ValidateBetween(0, 13), showErrorMessage: true },
    { rule: new ValidateRequired(), showErrorMessage: false }
  ] as const
  private readonly redThreeValidationRules: CanastaFormStateValidationRules[] = [
    { rule: new ValidateBetween(0, 4), showErrorMessage: true },
    { rule: new ValidateRequired(), showErrorMessage: false }
  ] as const
  private readonly scoreValidationRules: CanastaFormStateValidationRules[] = [
    { rule: new ValidateRequired(), showErrorMessage: false },
    { rule: new ValidateDivisibleBy(5), showErrorMessage: true }
  ] as const

  public readonly mixedCanastaError: string;
  public readonly naturalCanastaError: string;
  public readonly redThreesError: string;
  public readonly meldError: string;
  public readonly pointsInHandError: string;
  public readonly isValid: boolean;

  public constructor(
    public readonly mixedCanastas: number | null = null,
    public readonly naturalCanastas: number | null = null,
    public readonly redThrees: number | null = null,
    public readonly meld: number | null = null,
    public readonly pointsInHand: number | null = null,
    public readonly wentOut: boolean = false
  ) {
    this.isValid = true

    let result = this.runValidationRules(this.canastaValidationRules, this.mixedCanastas)
    this.mixedCanastaError = result.errorMessage

    if (!result.isValid) {
      this.isValid = false
    }

    result = this.runValidationRules(this.canastaValidationRules, this.naturalCanastas)
    this.naturalCanastaError = result.errorMessage

    if (!result.isValid) {
      this.isValid = false
    }

    result = this.runValidationRules(this.redThreeValidationRules, this.redThrees)
    this.redThreesError = result.errorMessage

    if (!result.isValid) {
      this.isValid = false
    }

    result = this.runValidationRules(this.scoreValidationRules, this.meld)
    this.meldError = result.errorMessage

    if (!result.isValid) {
      this.isValid = false
    }

    result = this.runValidationRules(this.scoreValidationRules, this.pointsInHand)
    this.pointsInHandError = result.errorMessage

    if (!result.isValid) {
      this.isValid = false
    }
  }

  private runValidationRules(rules: CanastaFormStateValidationRules[], value: number | null): { isValid: boolean, errorMessage: string } {
    let errorMessage = '';
    let isValid = true;
    rules.forEach(element => {
      const result = this.validate(element, value)
      if (typeof result === "string") {
        errorMessage = result
        isValid = false
      } else if (result === false) {
        isValid = false
      }
    });

    return { isValid, errorMessage }
  }

  private validate(rule: CanastaFormStateValidationRules, value: number | null): boolean | string {
    const result = rule.rule.validate(value)
    if (result) {
      return true
    } else if (rule.showErrorMessage) {
      return rule.rule.message
    }
    return false
  }

  public static default = new CanastaFormState()

  public copy(state: Partial<CanastaFormState>) {
    return new CanastaFormState(
      state.mixedCanastas === undefined ? this.mixedCanastas : state.mixedCanastas,
      state.naturalCanastas === undefined ? this.naturalCanastas : state.naturalCanastas,
      state.redThrees === undefined ? this.redThrees : state.redThrees,
      state.meld === undefined ? this.meld : state.meld,
      state.pointsInHand === undefined ? this.pointsInHand : state.pointsInHand,
      state.wentOut === undefined ? this.wentOut : state.wentOut
    )
  }
}

type CanastaFormStateValidationRules = {
  rule: ValidationRule,
  showErrorMessage: boolean
}
