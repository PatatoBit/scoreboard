import { colours } from './colours';

// place files you want to import through the `$lib` alias in this folder.
export const data = {
	labels: ['Red', 'Blue', 'Yellow', 'Green'],
	datasets: [
		{
			label: 'Victories',
			data: [5, 3, 2, 1],
			backgroundColor: [colours.red, colours.blue, colours.yellow, colours.green],
			hoverBackgroundColor: [colours.red, colours.blue, colours.yellow, colours.green]
		}
	]
};

export interface DuoMatch {
	team1: string;
	team2: string;
	score1: number;
	score2: number;
}

export interface QuadMatch {
	redScore: number;
	yellowScore: number;
	greenScore: number;
	blueScore: number;
}

export const basketballData: DuoMatch[] = [
	{
		team1: colours.red,
		team2: colours.blue,
		score1: 10,
		score2: 23
	},
	{
		team1: colours.yellow,
		team2: colours.green,
		score1: 2,
		score2: 1
	}
];

export const running400: QuadMatch = {
	redScore: 20,
	yellowScore: 40,
	greenScore: 1,
	blueScore: 2
};
