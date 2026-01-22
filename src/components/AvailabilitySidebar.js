import React, { useState, useEffect, useCallback } from 'react';

import { DateRange } from 'react-date-range';
import { format, eachDayOfInterval } from 'date-fns';

import { pt } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function AvailabilitySidebar({ pricingConfig }) {
  // Extrair configurações do pricingConfig
  const {
    PRICE_LOW,
    PRICE_HIGH,
    CLEANING_FEE,
    PROMO_WEEK_LOW,
    PROMO_WEEK_HIGH,
    PROMO_MONTH_LOW,
    PROMO_MONTH_HIGH,
    DAYS_IN_WEEK = 7,
    DAYS_IN_MONTH = 30,
    EXTRA_PERSON_3,
    EXTRA_PERSON_4,
    MIN_PEOPLE = 1,
    MAX_PEOPLE = 4,
    EMAIL_TARGET,
    WHATSAPP_TARGET,
    isHighSeason,
    unavailableRanges = []
  } = pricingConfig;

  const [selection, setSelection] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }]);

  const [validDates, setValidDates] = useState(false);
  const [numPeople, setNumPeople] = useState(1);
  const [messageBody, setMessageBody] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const disabledDates = unavailableRanges.flatMap(range => {
    const dates = [];
    const current = new Date(range.startDate);
    while (current <= range.endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  const calculateNights = () => {
    const { startDate, endDate } = selection[0];
    const diffTime = endDate - startDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSelect = (ranges) => {
    const newSelection = ranges.selection;
    setSelection([newSelection]);
    const nights = Math.ceil((newSelection.endDate - newSelection.startDate) / (1000 * 60 * 60 * 24));
    setValidDates(nights >= 2);
  };

  const calculatePrice = useCallback(() => {

    const { startDate, endDate } = selection[0];
    const nights = calculateNights();
    if (nights < 2) return '⚠️ Mínimo 2 noites';

    const allDates = eachDayOfInterval({ start: startDate, end: new Date(endDate.getTime() - 1) });
    let total = 0;
    let remainingDates = [...allDates];

    // Calculando meses completos (considerando época alta e baixa)
    const fullMonths = Math.floor(remainingDates.length / DAYS_IN_MONTH);
    const monthBlockDates = remainingDates.slice(0, fullMonths * DAYS_IN_MONTH);
    const monthHigh = monthBlockDates.filter(date => isHighSeason(date)).length;
    const monthLow = monthBlockDates.length - monthHigh;

    if (fullMonths > 0) {
      const highSeasonPrice = (PROMO_MONTH_HIGH / DAYS_IN_MONTH) * monthHigh;
      const lowSeasonPrice = (PROMO_MONTH_LOW / DAYS_IN_MONTH) * monthLow;
      total += highSeasonPrice + lowSeasonPrice;
    }

    remainingDates = remainingDates.slice(fullMonths * DAYS_IN_MONTH);

    // Calculando semanas completas
    const fullWeeks = Math.floor(remainingDates.length / DAYS_IN_WEEK);
    const weekBlockDates = remainingDates.slice(0, fullWeeks * DAYS_IN_WEEK);
    const weekHigh = weekBlockDates.filter(date => isHighSeason(date)).length;
    const weekLow = weekBlockDates.length - weekHigh;
    total += weekHigh * (PROMO_WEEK_HIGH / DAYS_IN_WEEK) + weekLow * (PROMO_WEEK_LOW / DAYS_IN_WEEK);
    remainingDates = remainingDates.slice(fullWeeks * DAYS_IN_WEEK);

    // Calculando as noites restantes
    for (const date of remainingDates) {
      total += isHighSeason(date) ? PRICE_HIGH : PRICE_LOW;
    }

    const extraPerNight = (numPeople >= 4 ? EXTRA_PERSON_4 : 0) + (numPeople >= 3 ? EXTRA_PERSON_3 : 0);
    total += extraPerNight * nights;

    const finalPrice = Math.round(total + CLEANING_FEE);
    setFinalTotal(finalPrice);
}, [
  selection,
  numPeople,
  calculateNights,
  PRICE_LOW,
  PRICE_HIGH,
  CLEANING_FEE,
  PROMO_WEEK_LOW,
  PROMO_WEEK_HIGH,
  PROMO_MONTH_LOW,
  PROMO_MONTH_HIGH,
  DAYS_IN_WEEK,
  DAYS_IN_MONTH,
  EXTRA_PERSON_3,
  EXTRA_PERSON_4,
  isHighSeason
]);




  useEffect(() => {
    if (!validDates) return;

    const { startDate, endDate } = selection[0];
    const allDates = eachDayOfInterval({ start: startDate, end: new Date(endDate.getTime() - 1) });
    const totalNights = allDates.length;

    const summaryText = `Exmo. Senhor Nuno,\n\n` +
      `Venho por este meio demonstrar o meu interesse em reservar o seu apartamento para as seguintes datas:\n` +
      `Check-in: ${format(startDate, 'dd/MM/yyyy')}\n` +
      `Check-out: ${format(endDate, 'dd/MM/yyyy')}\n` +
      `Número de noites: ${totalNights}\n` +
      `Número de pessoas: ${numPeople}\n\n` +
      `Gostaria de confirmar se o alojamento se encontra disponível.\n` +
      `Aguardo resposta com os próximos passos.\n\n` +
      `Com os melhores cumprimentos,\n[O SEU NOME]\n[O SEU CONTACTO]`;

    setMessageBody(encodeURIComponent(summaryText));
    calculatePrice();
  }, [selection, numPeople, validDates, calculatePrice]);





  const renderDetails = () => {
    const { startDate, endDate } = selection[0];
    const allDates = eachDayOfInterval({ start: startDate, end: new Date(endDate.getTime() - 1) });
    const totalNights = allDates.length;

    let remainingDates = [...allDates];

    const fullMonths = Math.floor(remainingDates.length / DAYS_IN_MONTH);
    const monthBlockDates = remainingDates.slice(0, fullMonths * DAYS_IN_MONTH);
    const monthHigh = monthBlockDates.filter(date => isHighSeason(date)).length;
    const monthLow = monthBlockDates.length - monthHigh;
    const monthTotal = (PROMO_MONTH_HIGH / DAYS_IN_MONTH) * monthHigh + (PROMO_MONTH_LOW / DAYS_IN_MONTH) * monthLow;
    remainingDates = remainingDates.slice(fullMonths * DAYS_IN_MONTH);

    const fullWeeks = Math.floor(remainingDates.length / DAYS_IN_WEEK);
    const weekBlockDates = remainingDates.slice(0, fullWeeks * DAYS_IN_WEEK);
    const weekHigh = weekBlockDates.filter(date => isHighSeason(date)).length;
    const weekLow = weekBlockDates.length - weekHigh;
    const weekTotal = weekHigh * (PROMO_WEEK_HIGH / DAYS_IN_WEEK) + weekLow * (PROMO_WEEK_LOW / DAYS_IN_WEEK);
    remainingDates = remainingDates.slice(fullWeeks * DAYS_IN_WEEK);

    const extraDays = remainingDates.map(date => ({
      date,
      price: isHighSeason(date) ? PRICE_HIGH : PRICE_LOW,
      label: isHighSeason(date) ? 'Alta' : 'Baixa',
    }));
    const extrasTotal = extraDays.reduce((acc, d) => acc + d.price, 0);

    const extraPerNight = (numPeople >= 4 ? EXTRA_PERSON_4 : 0) + (numPeople >= 3 ? EXTRA_PERSON_3 : 0);
    const totalExtrasPessoas = extraPerNight * totalNights;
    const finalTotal = Math.round(monthTotal + weekTotal + extrasTotal + totalExtrasPessoas + CLEANING_FEE);

    return (
      <div>
        <h3>Detalhes completos da simulação</h3>
        <p><strong>Noites totais:</strong> {totalNights}</p>
        <ul>
          {allDates.map((date, idx) => (
            <li key={idx}>{format(date, 'dd/MM/yyyy')} - {isHighSeason(date) ? `Época Alta (${PRICE_HIGH}€)` : `Época Baixa (${PRICE_LOW}€)`}</li>
          ))}
        </ul>
        <hr />
        <p><strong>Promoções aplicadas:</strong></p>
        {fullMonths > 0 && <p>{fullMonths} mês(es) → {Math.round(monthTotal)}€</p>}
        {fullWeeks > 0 && <p>{fullWeeks} semana(s) → {Math.round(weekTotal)}€</p>}
        {extraDays.length > 0 && (
          <div>
            <p>Noites extra fora de promoções:</p>
            <ul>
              {extraDays.map((d, i) => (
                <li key={i}>{format(d.date, 'dd/MM/yyyy')} - Época {d.label} → {d.price}€</li>
              ))}
            </ul>
            <p>Total dessas noites: {extrasTotal}€</p>
          </div>
        )}
        {extraPerNight > 0 && <p>Extra por pessoa adicional: {extraPerNight}€/noite × {totalNights} = {totalExtrasPessoas}€</p>}
        <p>Taxa de limpeza: {CLEANING_FEE}€</p>
        <h4>Total final: {finalTotal}€</h4>
        <button onClick={() => setShowDetails(false)} style={{ marginTop: '20px' }}>Fechar</button>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div>
        <h3>Resumo da Simulação</h3>
        <p><strong>Check-in:</strong> {format(selection[0].startDate, 'dd/MM/yyyy')}</p>
        <p><strong>Check-out:</strong> {format(selection[0].endDate, 'dd/MM/yyyy')}</p>
        <p><strong>Noites:</strong> {calculateNights()}</p>
        <p><strong>N.º pessoas:</strong> {numPeople} (preços aplicam-se a 1-2, extra a partir de 3)</p>
        <p><strong>Preço estimado:</strong> {validDates ? finalTotal : '⚠️ Mínimo 2 noites'}€</p>
        <div style={{ marginTop: '20px' }}>
          <a href={`mailto:${EMAIL_TARGET}?subject=Pedido de reserva 5 Steps House&body=${messageBody}`} target="_blank" rel="noreferrer">
            <button style={{ marginRight: '10px' }}>Enviar por Email</button>
          </a>
          <a href={`https://wa.me/${WHATSAPP_TARGET}?text=${messageBody}`} target="_blank" rel="noreferrer">
            <button style={{ marginRight: '10px' }}>Enviar por WhatsApp</button>
          </a>
          <button onClick={() => setShowDetails(true)}>Ver Detalhes</button>
        </div>
      </div>
    );
  };

  return (
    <div className="sidebar-box">
      <h3>Simulador de Estadia</h3>

      <DateRange
        locale={pt}
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={selection}
        minDate={new Date()}
        disabledDates={disabledDates}
      />

      <div style={{ marginTop: '20px' }}>
        <strong>Check-in:</strong> {format(selection[0].startDate, 'dd/MM/yyyy')}<br />
        <strong>Check-out:</strong> {format(selection[0].endDate, 'dd/MM/yyyy')}<br />
        <strong>Noites:</strong> {calculateNights()}<br />
        <strong>Preço estimado:</strong> {validDates ? finalTotal : '⚠️ Mínimo 2 noites'}€<br />
        <div style={{ marginTop: '10px' }}>
          <strong>N.º Pessoas:</strong>
          <button onClick={() => setNumPeople(p => Math.max(MIN_PEOPLE, p - 1))} disabled={numPeople <= MIN_PEOPLE}>-</button>
          <span style={{ margin: '0 10px' }}>{numPeople}</span>
          <button onClick={() => setNumPeople(p => Math.min(MAX_PEOPLE, p + 1))} disabled={numPeople >= MAX_PEOPLE}>+</button>
        </div>
      </div>

      {validDates && (
        <button onClick={() => setShowSummary(true)} style={{ marginTop: '15px' }} >
          Avançar
        </button>
      )}

      {showSummary && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: '30px',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)', zIndex: 1000
        }}>
          {renderSummary()}
          <button onClick={() => setShowSummary(false)} style={{ marginTop: '20px' }} >
            Fechar
          </button>
        </div>
      )}

      {showDetails && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: '30px',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)', zIndex: 1000,
          maxHeight: '80vh', overflowY: 'auto'
        }}>
          {renderDetails()}
        </div>
      )}
    </div>
  );
}

export default AvailabilitySidebar;