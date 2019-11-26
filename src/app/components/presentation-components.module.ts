import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { InterestComponent } from './interest/interest.component';
import { PeriodMentoringComponent } from './period-mentoring/period-mentoring.component';
import { CheckboxesComponent } from './checkbox/checkboxes.component';
import { ExperienceComponent } from './experience/experience.component';
import { MenteePreferenceComponent } from './mentee-preference/mentee-preference.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const components = [
    InterestComponent,
    PeriodMentoringComponent,
    CheckboxesComponent,
    ExperienceComponent,
    MenteePreferenceComponent,
    TermsConditionsComponent
]

@NgModule({
    imports: [CommonModule, MaterialModule, SharedModule],
    exports: [...components],
    declarations: [...components]
})
export class PresentationComponentsModule { }
