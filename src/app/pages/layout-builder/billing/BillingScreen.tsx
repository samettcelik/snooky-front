import React, { useEffect } from "react";
import { NeverPaid } from "./NeverPaid";
import { RePayment } from "./RePayment";
import { CreditCards } from "./CreditCards";
import { ActivePlan } from "./ActivePlan";
import { BillingAddress } from "./BillingAddress";
import { SnookyClient } from "../../../modules/Request";

type Props = {};

const BillingScreen: React.FC<Props> = ({ }) => {

  useEffect(() => {
    // getSubscription()
    // getSubscriptionList()
    // getInvoices()
    // getSettings()
    getPaymentMethod()
    // addTestData()
  }, [])

  const getSubscription = async () => {
    const data = await SnookyClient.GetSubscription()
    console.log('getSubscription');
    console.log('getSubscription');
    console.log(data);
  }

  const getSubscriptionList = async () => {
    const data = await SnookyClient.GetSubscriptionList()
    console.log('getSubscriptionList');
    console.log('getSubscriptionList');
    console.log(data);
  }

  const getInvoices = async () => {
    const data = await SnookyClient.GetInvoices()
    console.log('getInvoices');
    console.log('getInvoices');
    console.log(data);
  }
  const getSettings = async () => {
    const data = await SnookyClient.GetSettings()
    console.log('getSettings');
    console.log('getSettings');
    console.log(data);
  }
  const getPaymentMethod = async () => {
    const data = await SnookyClient.GetPaymentMethod()
    console.log('getPaymentMethod');
    console.log('getPaymentMethod');
    console.log(data);
  }
  const addTestData = async () => {
    const data = await SnookyClient.AddTestSubsData()
    console.log('addTestData');
    console.log('addTestData');
    console.log(data);
  }

  return (
    <>

      <ActivePlan />

      <NeverPaid />

      <CreditCards />

      <BillingAddress />

      <RePayment />

    </>
  );
};

export { BillingScreen };
