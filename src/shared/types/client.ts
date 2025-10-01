export type Client = {
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

export type Product = {
	id: number;
	name: string;
	link: string;
};

export type Answer = {
	product: Product;
	is_correct: boolean;
};

export type Hint = {
	product: {
		id: number;
		name: string;
		link: string;
	};
	text: string;
};

export type Situation = {
	index: number;
	client: Client;
	answers: Answer[];
	hint: Hint;
};

export type Level = {
	level_info: {
		seed: string;
	};
	situations: Situation[];
};

export type SituationResult = {
	client: Client;
	review: {
		answered_product: Product;
		answer_status:
			| "incorrect_but_selected"
			| "correct_but_not_selected"
			| "full_correct";
		review: string;
	}[];
	rating: number;
};

export type LevelResult = {
	reviews: SituationResult[];
	total_rating: number;
};
