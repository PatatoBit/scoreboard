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
	createdAt: string;
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
	title: string;
	createdAt: string;
	redScore: number;
	yellowScore: number;
	greenScore: number;
	blueScore: number;
}
