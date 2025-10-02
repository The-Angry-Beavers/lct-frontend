import type { Client } from "@/shared/types";
import img2 from "./student-man.webp?url";
import img1 from "./student-woman.webp?url";

export const MockClient1: Client = {
	first_name: "Маша",
	last_name: "Петрова",
	gender: "female",
	age: "young",
	job_sphere: "Студент",
	is_married: false,
	is_have_child: false,
	is_have_real_estate: false,
	message:
		"Деняк совсем нет... Мне бы завести ещё одну кредитку. Что вы можете мне предложить?",
	sprite: img1,
	city: "Москва",
};

export const MockClient2: Client = {
	first_name: "Саша",
	last_name: "Петров",
	gender: "male",
	age: "young",
	job_sphere: "Студент",
	is_married: false,
	is_have_child: false,
	is_have_real_estate: false,
	message:
		"В интернете услышал про ФПИ Банк, там был указан ваш адрес. Хотел бы оформить вашу дебетовую карту.",
	sprite: img2,
	city: "Москва",
};
