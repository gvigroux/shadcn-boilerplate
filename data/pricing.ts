import { PricingProps } from "@/components/boilerplate/landing/pricing";

import * as m from "@/paraglide/messages.js";
export const pricingListTest: PricingProps[] = [
  {
    title: m.plan1_title(),
    popular: 0,
    price: 0,
    priceDetail: m.plan1_price_detail(),
    description: m.plan1_price_description(),
    buttonText: m.plan1_button_text(),
    benefitList: [
      m.plan1_benefit_1(),
      m.plan1_benefit_2(),
      m.plan1_benefit_3(),
      m.plan1_benefit_4(),
    ],
  },
  {
    title: m.plan2_title(),
    popular: 1,
    price: 5,
    priceDetail: m.plan2_price_detail(),
    description: m.plan2_price_description(),
    buttonText: m.plan2_button_text(),
    benefitList: [
      m.plan2_benefit_1(),
      m.plan2_benefit_2(),
      m.plan2_benefit_3(),
      m.plan2_benefit_4(),
    ],
  },
  {
    title: m.plan3_title(),
    popular: 0,
    price: 40,
    priceDetail: m.plan3_price_detail(),
    description: m.plan3_price_description(),
    buttonText: m.plan3_button_text(),
    benefitList: [
      m.plan3_benefit_1(),
      m.plan3_benefit_2(),
      m.plan3_benefit_3(),
      m.plan3_benefit_4(),
    ],
  },
];
