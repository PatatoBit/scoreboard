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
	title: string;

	colors: {
		color1: string;
		color2: string;
	};

	scores: {
		score1: number;
		score2: number;
	};
}

export interface QuadMatch {
	redScore: number;
	yellowScore: number;
	greenScore: number;
	blueScore: number;
}

export const basketballData: DuoMatch[] = [
	{
		title: 'Basketball',
		colors: {
			color1: colours.red,
			color2: colours.blue
		},
		scores: {
			score1: 5,
			score2: 3
		}
	},
	{
		title: 'Trashball',
		colors: {
			color1: colours.yellow,
			color2: colours.green
		},
		scores: {
			score1: 2,
			score2: 1
		}
	}
];

export const running400: QuadMatch = {
	redScore: 20,
	yellowScore: 40,
	greenScore: 1,
	blueScore: 2
};
