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
	id: string;
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
	id: string;
	createdAt: string;
	redScore: number;
	yellowScore: number;
	greenScore: number;
	blueScore: number;
}

export const QuadColourIndex = {
	1: 'red',
	2: 'yellow',
	3: 'green',
	4: 'blue'
};
export function isDuoMatch(matchData: object) {
	if ('redScore' in matchData) return false;
	else if ('colors' in matchData) return true;
	else return null;
}

export function getColorName(hex: string) {
	for (const [name, value] of Object.entries(colours)) {
		if (value === hex) {
			return name;
		}
	}
	return null; // If the color is not found
}
