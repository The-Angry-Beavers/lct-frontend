import type { Client } from "@/shared/types";
import img from "./student-woman.webp?url";

export const MockClient: Client = {
	gender: "female",
	age: "young",
	job_spehere: "Студент",
	is_married: false,
	is_have_child: false,
	is_have_real_estate: false,
	message: "",
	sprite: img,
	city: "Москва",
};
