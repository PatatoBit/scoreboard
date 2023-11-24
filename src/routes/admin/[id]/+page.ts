export const load = ({ params }) => {
	console.log(params);

	return {
		id: params.id
	};
};

export interface matchPage {
	id: string;
}
