import { IBenefitStates } from "./IBenefitStates";
import { IHRFormStates } from "./IHRFormStates";
import { IPaylocityStates } from "./IPaylocity";
import { IPolicyStates } from "./IPolicyStates";

export interface IDocumentStates {
    benefits: Array<IBenefitStates>
    hrForms: Array<IHRFormStates>
    paylocity: Array<IPaylocityStates>
    policies: Array<IPolicyStates>
}