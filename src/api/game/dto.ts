export type SituationDTO = {
	generation_params: {
		seed: string;
		num_iterations: number;
	};
	client: {
		first_name: string;
		last_name: string;
		gender: "male" | "female";
		age: string;
		job_sphere: string;
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
