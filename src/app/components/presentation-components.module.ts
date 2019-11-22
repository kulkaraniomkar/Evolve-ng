import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { TextareaComponent } from './textarea/textarea.component';  
import { InputComponent } from './input/input.component';
//import { RadioComponent } from './radio/radio.component';
import { CheckboxesComponent } from './checkbox/checkboxes.component';
import { SelectComponent } from './select/select.component';
import { TableComponent } from './table/table.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { ExperienceComponent } from './experience/experience.component';
import { SharedModule } from '../shared/shared.module';
import { InterestComponent } from './interest/interest.component';
import { AchievementComponent } from './achievement/achievement.component';
import { MenteePreferenceComponent } from './mentee-preference/mentee-preference.component';
import { GenderAgeComponent } from './gender-age/gender-age.component';
// import { AchievementExperienceComponent } from './achievement-experience!/achievement-experience.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PeriodMentoringComponent } from './period-mentoring/period-mentoring.component';

const components = [
    InterestComponent,
    PeriodMentoringComponent,
    TermsConditionsComponent,
    // AchievementExperienceComponent,
    ExperienceComponent,
    GenderAgeComponent,
    AchievementComponent,
    
    MenteePreferenceComponent,
    TextareaComponent,
    InputComponent,
    //RadioComponent,
    CheckboxesComponent,
    SelectComponent,
    TableComponent,
    ProfileCardComponent,
    TypeaheadComponent
]

@NgModule({
    imports: [CommonModule, MaterialModule, SharedModule],
    exports: [...components],
    declarations: [...components]
})
export class PresentationComponentsModule { }
