export type SituationDTO = {
	generation_params: {
		seed: string;
		num_iterations: number;
	};
	client: {
		name: string;
		gender: "male" | "female";
		age: string;
		job_spehere: string;
		is_married: boolean;
		is_have_child: boolean;
		is_have_real_estate: boolean;
		city: string;
		message: string;
		sprite: string;
	};
	answers: Array<{
		product: {
			id: number;
			name: string;
			link: string;
		};
		is_correct: boolean;
	}>;
};
