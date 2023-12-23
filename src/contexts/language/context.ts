import { default as langBR } from './langBR.json';
import {
  createLanguageContext,
  createLanguageSetterContext,
} from 'minimal-components-react/dist/contexts/language';

const LanguageContext = createLanguageContext<typeof langBR>();
const LanguageSetterContext = createLanguageSetterContext<any>();

export { LanguageContext, LanguageSetterContext };
