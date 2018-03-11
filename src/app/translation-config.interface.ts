import { Translation } from "./translation.interface";

export interface TranslationConfig {
	default: string;
	translations: Translation[];
}
