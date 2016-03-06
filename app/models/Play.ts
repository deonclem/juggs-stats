export class Play {
    public week: string;
    public game: string;
    public video_id: string;
    public opponent: string;
    public side: string;
    public play_type: string;
    public play_formation: string;
    public play_routes: string;
    public completed: string;
    public incomplete: string;
    public dropped: string;
    public defended: string;
    public intercepted: string;
    public sack: string;
    public flagged: string;
    public out_of_bounds: string;
    public fumble: string;
    public score: string;
    public conversion: string;
    public fourthDown: string;
    public penalty: string;
    public quarterback: string;
    public player: string[];

    constructor(week:string, game:string, video_id:string, opponent:string, side:string, play_type:string, play_formation:string, play_routes:string, completed:string, incomplete:string, dropped:string, defended:string, intercepted:string, sack:string, flagged:string, out_of_bounds:string, fumble:string, score:string, conversion:string, fourthDown:string, penalty:string, quarterback:string, player:string[]) {
        this.week = week;
        this.game = game;
        this.video_id = video_id;
        this.opponent = opponent;
        this.side = side;
        this.play_type = play_type;
        this.play_formation = play_formation;
        this.play_routes = play_routes;
        this.completed = completed;
        this.incomplete = incomplete;
        this.dropped = dropped;
        this.defended = defended;
        this.intercepted = intercepted;
        this.sack = sack;
        this.flagged = flagged;
        this.out_of_bounds = out_of_bounds;
        this.fumble = fumble;
        this.score = score;
        this.conversion = conversion;
        this.fourthDown = fourthDown;
        this.penalty = penalty;
        this.quarterback = quarterback;
        this.player = player;
    }
}