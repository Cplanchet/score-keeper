
export default class CanastaPageViewModel {

  constructor(public readonly state = CanastaPageState.default) { }

  public onMixedChange(team: "us" | "them", value: number) {
    return this.withState(this.state.copy({ formState: { [team]: this.state.formState[team].copy({ mixedCanastas: value }) } }))
  }

  public withState(state: CanastaPageState) {
    return new CanastaPageViewModel(state)
  }
}

export class CanastaPageState {

  private static _default?: CanastaPageState = undefined;

  private constructor(
    public scores: { us: CanastaScore, them: CanastaScore } = { us: CanastaScore.default, them: CanastaScore.default },
    public pageMode: CanastaPageMode = CanastaPageMode.VIEW,
    public formState: { us: CanastaFormState, them: CanastaFormState } = { us: CanastaFormState.default, them: CanastaFormState.default }
  ) { }


  public static get default() {
    return new CanastaPageState()
  }

  public copy(
    value: {
      score?: {
        us?: CanastaScore,
        them?: CanastaScore
      }
      formState?: {
        us?: CanastaFormState,
        them?: CanastaFormState
      },
      pageMode?: CanastaPageMode
    }
  ) {
    return new CanastaPageState(
      {
        us: value.score?.us ?? this.scores.us,
        them: value.score?.them ?? this.scores.them
      },
      value.pageMode ?? this.pageMode,
      {
        us: value.formState?.us ?? this.formState.us,
        them: value.formState?.them ?? this.formState.them
      }
    )
  }
}

export class CanastaScore {
  public readonly score: number;
  public readonly firstMeldMinimum: number;
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
    const canastaBonus = (score.canastaCount.mixed ?? 0) * 300 + (score.canastaCount.natural ?? 0) * 500;
    const pointsInHand = score.pointsInHand;
    const redThreeScore = score.redThrees === 4 ? score.redThrees * 200 : score.redThrees * 100;
    const meldScore = score.meld
    const goingOutBonus = score.wentOut ? 100 : 0

    return new CanastaHandScore(canastaBonus, pointsInHand, redThreeScore, meldScore, goingOutBonus)
  }
}

export enum CanastaPageMode {
  VIEW = 'view',
  SCORE = 'score'
}

export class CanastaFormState {
  public constructor(
    public readonly mixedCanastas: number = 0,
    public readonly naturalCanastas: number = 0,
    public readonly redThrees: number = 0,
    public readonly meld: number = 0,
    public readonly pointsInHand: number = 0,
    public readonly wentOut: boolean = false
  ) { }

  public static default = new CanastaFormState()

  public copy(state: Partial<CanastaFormState>) {
    return new CanastaFormState(
      state.mixedCanastas ?? this.mixedCanastas,
      state.naturalCanastas ?? this.naturalCanastas,
      state.redThrees ?? this.redThrees,
      state.meld ?? this.meld,
      state.pointsInHand ?? this.pointsInHand,
      state.wentOut ?? this.wentOut
    )
  }
}
