export type Client = {
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

export type Answer = {
	product: {
		id: number;
		name: string;
		link: string;
	};
	is_correct: boolean;
};

export type Situation = {
	index: number;
	client: Client;
	answers: Answer[];
};

export type Level = {
	level_info: {
		seed: string;
	};
	situations: Situation[];
};
