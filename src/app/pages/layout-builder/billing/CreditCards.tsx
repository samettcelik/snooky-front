import { useState } from "react";
import { CustomModal } from "../../../modules/customComponents/CustomModal";
import { CiEdit } from "react-icons/ci";
import InputMask from 'react-input-mask';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";


const CreditCards = () => {
  const [showDeleteCardModal, setShowDeleteCardModal] = useState<boolean>(false)
  const [showEditCardModal, setShowEditCardModal] = useState<boolean>(false)
  const [selectedCardındex, setSelecetedCardIndex] = useState<number | null>(null)

  const [selectedCard, setSelectedCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focused: '',
    isCardFlipped: false,
  });

  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Marcus Morris 1",
      cardType: "Visa",
      cardNumber: "9768 4567 9657 4566",
      expiration: "09/24",
      cvv: "234",
      primary: true,
    },
    {
      id: 2,
      name: "Jacob Holder 2",
      cardType: "Mastercard",
      cardNumber: "9867 8768 4567 2040",
      expiration: "10/22",
      cvv: "856",
      primary: false,
    },
  ]);

  const sortObjectsByPrimary = (arr) => {
    return arr.sort((a, b) => {
      if (a.primary === true && b.primary === false) return -1; // a önce gelmeli
      if (a.primary === false && b.primary === true) return 1; // b önce gelmeli
      return 0; // Değerler eşit
    });
  };

  const maskCreditCardNumber = (cardNumber) => {
    const numString = cardNumber.toString();
    const firstThree = numString.slice(0, 3);
    const lastThree = numString.slice(-3);
    const middleStars = "*".repeat(numString.length - 6);
    const maskedNumber = `${firstThree}${middleStars}${lastThree}`;
    return maskedNumber;
  };

  const maskGenerator = createDefaultMaskGenerator('9999 9999 9999 9999');

  const makePrimary = (cardId) => {
  };

  const deleteCard = () => {
    const _cards = [...cards]
    if (selectedCardındex !== null) {
      _cards.splice(selectedCardındex, 1)
    }
    setCards([..._cards])
  }


  const inputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === 'number' && value.length > 16) {
      return;
    }
    setSelectedCard((prev) => ({ ...prev, [name]: value }));
  }

  const inputFocus = (evt) => {
    setSelectedCard((prev) => ({ ...prev, focused: evt.target.name }));
  }

  const cvcFocus = () => {

    setSelectedCard({
      ...selectedCard,
      isCardFlipped: true,
      focused: 'cvc',
    });
  };

  const cvcBlur = () => {

    setSelectedCard({
      ...selectedCard,
      isCardFlipped: false,
      focused: '',
    });
  };

  const expiryFocus = () => {

    setSelectedCard({
      ...selectedCard,
      isCardFlipped: false,
      focused: 'expiry',
    });
  };
  const setnumber = (value) => {
    setSelectedCard((prev) => ({ ...prev, ['number']: value }));
  }

  return (
    <>
      {showDeleteCardModal &&
        <CustomModal
          title="Delete Card"
          Content={() => (
            <p>Are you sure you want to delete the card information?</p>
          )}
          setShowModal={setShowDeleteCardModal}
          onPressSubmitButton={() => {
            deleteCard()
          }}
          onPressCancelButton={() => {
            setShowDeleteCardModal(false)
            setSelecetedCardIndex(null)
          }}
          submitBtnClassName="btn-danger"
          submitBtnTitle="Delete Payment"
          cancelBtnTitle="Discard"
        />
      }
      {showEditCardModal &&
        <CustomModal
          title="Edit Card"
          Content={() => (
            <>
              <div className="menu-item">
                <div className='d-flex flex-column flex-lg-row align-items-center'>
                  {/* <div className='col-12 col-lg-6'>
                    <Cards
                      number={selectedCard.number}
                      expiry={selectedCard.expiry}
                      cvc={selectedCard.cvc}
                      name={selectedCard.name}
                      // focused={selectedCard.focused}
                      // isCardFlipped={selectedCard.isCardFlipped}
                    />
                  </div> */}
                  <form className='col-12 col-lg-12'>
                    <label className='required fw-bold fs-6 mb-2 mt-10 mt-lg-0'>Card Number</label>
                    <MaskedInput
                      maskGenerator={maskGenerator}
                      name='number'
                      placeholder="Card Number"
                      value={selectedCard.number}
                      onChange={setnumber}
                      onFocus={inputFocus}
                      className={'form-control form-control-solid mb-3 mb-lg-0'}
                    />
                    <label className='fw-bold fs-6 mb-2 mt-4'>Name</label>
                    <input
                      placeholder='Name'
                      type='text'
                      name='name'
                      className={'form-control form-control-solid mb-3 mb-lg-0'}
                      autoComplete='off'
                      value={selectedCard.name}
                      onChange={inputChange}
                    />
                    <label className='required fw-bold fs-6 mb-2 mt-4'>CVV/CVC</label>
                    <InputMask
                      mask="999"
                      maskChar=" "
                      type="text"
                      name="cvc"
                      placeholder="CVV/CVC"
                      value={selectedCard.cvc}
                      onChange={inputChange}
                      onFocus={cvcFocus}
                      onBlur={cvcBlur}
                      className={'form-control form-control-solid mb-3 mb-lg-0'}
                      autoComplete="off"
                    />
                    <label className="required fw-bold fs-6 mb-2 mt-4">Expiration Date</label>
                    <InputMask
                      mask="99/99"
                      maskChar=" "
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={selectedCard.expiry}
                      onChange={inputChange}
                      onFocus={expiryFocus}
                      className={'form-control form-control-solid mb-3 mb-lg-0'}
                      autoComplete="off"
                    />
                  </form>
                </div>
              </div>
            </>
          )}
          setShowModal={setShowEditCardModal}
          onPressSubmitButton={() => {
            // deleteCard()
          }}
          onPressCancelButton={() => {
            setShowEditCardModal(false)
            setSelecetedCardIndex(null)
          }}
          submitBtnClassName="btn-danger"
          submitBtnTitle="Edit Payment"
          cancelBtnTitle="Discard"
        />
      }
      <div className="card mb-10 mb-xl-10">
        <div className="card-header card-header-stretch pb-0">
          <div className="card-title d-flex flex-row justify-content-between align-items-center w-100">
            <h3 className="m-0">Payment Methods</h3>
            <a
              href="#"
              className="btn btn-primary px-6 py-2 align-self-center text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#AddPaymentCardModal"
            >
              Add Card{" "}
            </a>
          </div>
        </div>

        <div
          id="kt_billing_payment_tab_content"
          className="card-body tab-content"
        >
          <div
            id="kt_billing_creditcard"
            className="tab-pane fade active show"
            role="tabpanel"
            aria-labelledby="kt_billing_creditcard_tab"
          >
            <div className="row gx-9 gy-6">
              {sortObjectsByPrimary(cards).map((card, index) => (
                <div
                  className="col-lg-6"
                  key={card.id}
                  data-kt-billing-element="card"
                >
                  <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6 position-relative">
                    <div
                      onClick={() => setShowEditCardModal(true)}
                      className="position-absolute end-0 top-0 mt-2 me-2 bg-gray-200 rounded px-2 py-1 btn btn-sm btn-light btn-active-light-primary"
                    >
                      <CiEdit className="fs-lg" />
                    </div>
                    <div className="d-flex flex-column py-2">
                      <div className="d-flex align-items-center fs-4 fw-bold mb-5">
                        {card.name}
                        {card.primary && (
                          <span className="badge badge-light-success fs-7 ms-2">
                            Primary
                          </span>
                        )}
                      </div>

                      <div className="d-flex align-items-center">
                        <img
                          src={`/metronic8/demo1/assets/media/svg/card-logos/${card.cardType.toLowerCase()}.svg`}
                          alt=""
                          className="me-4"
                        />

                        <div>
                          <div className="fs-4 fw-bold">
                            {card.cardType} <br />
                            {maskCreditCardNumber(card.cardNumber)}
                          </div>
                          <div className="fs-6 fw-semibold text-gray-400">
                            Card expires at {card.expiration}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center py-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger btn-active-light-primary me-3"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowDeleteCardModal(true)
                          setSelecetedCardIndex(index)
                        }}
                      >
                        <span className="indicator-label">Delete</span>

                        <span className="indicator-progress">
                          Please wait...{" "}
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                      </button>
                      {card.primary == false && (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-light btn-active-light-primary"
                            onClick={() => makePrimary(card.id)}
                          >
                            Set Primary
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {cards.length === 0 && (
                <div className="col-lg-6">
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed h-lg-100 p-6">
                    <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                      <div className="mb-3 mb-md-0 fw-semibold">
                        <h4 className="text-gray-900 fw-bold">Important Note!</h4>
                      </div>
                      <a
                        href="#"
                        className="btn btn-primary px-6 align-self-center text-nowrap"
                        data-bs-toggle="modal"
                        data-bs-target="#AddPaymentCardModal"
                      >
                        Add Card{" "}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CreditCards };
