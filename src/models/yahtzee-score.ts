export default class YahtzeeScoreCard {
  constructor(
    public score: YahtzeeScore
  ) { }
  static empty(): YahtzeeScoreCard {
    return new YahtzeeScoreCard(
      {
        ace: null,
        two: null,
        three: null,
        four: null,
        five: null,
        six: null,

        threeOfKind: null,
        fourOfKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        yahtzee: null,
        bonus: 0,
        chance: null,
      }
    );
  }

  public copy(scoreCard: Partial<YahtzeeScore>): YahtzeeScoreCard {
    return new YahtzeeScoreCard(
      {
        ...this.score,
        ...scoreCard
      }
    );
  }

  public calculateTotalScore(): number {
    const topScore = this.calculateTopScore()


    return (topScore >= 63 ? 35 : 0) +
      topScore +
      (this.score.threeOfKind || 0) +
      (this.score.fourOfKind || 0) +
      (this.score.fullHouse ? 25 : 0) +
      (this.score.smallStraight ? 30 : 0) +
      (this.score.largeStraight ? 40 : 0) +
      (this.score.yahtzee ? 50 : 0) +
      (this.score.yahtzee && this.score.bonus ? this.score.bonus * 100 : 0) +
      (this.score.chance || 0);
  }

  public calculateTopScore(): number {
    return (this.score.ace || 0) +
      (this.score.two || 0) +
      (this.score.three || 0) +
      (this.score.four || 0) +
      (this.score.five || 0) +
      (this.score.six || 0);
  }

  public isFilled(): boolean {
    return !Object.values(this.score).some((value) => value === null)
  }
  public isTopFilled(): boolean {
    return ![this.score.ace, this.score.two, this.score.three, this.score.four, this.score.five, this.score.six].some((value) => value === null)
  }
}

export type YahtzeeScore = {
  ace: number | null;
  two: number | null;
  three: number | null;
  four: number | null;
  five: number | null;
  six: number | null;

  threeOfKind: number | null;
  fourOfKind: number | null;
  fullHouse: boolean | null;
  smallStraight: boolean | null;
  largeStraight: boolean | null;
  yahtzee: boolean | null;
  bonus: number;
  chance: number | null;
}
