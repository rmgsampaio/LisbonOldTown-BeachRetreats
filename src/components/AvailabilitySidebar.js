import React, { useState, useCallback, useMemo } from 'react';
import { DateRange } from 'react-date-range';
import { format, eachDayOfInterval } from 'date-fns';
import { pt } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
import { Minus, Plus, Mail, MessageCircle, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { isHighSeason, CONTACT } from '../data/apartments';
import Modal from './Modal';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './AvailabilitySidebar.css';

function AvailabilitySidebar({ pricingConfig }) {
  const { t, language } = useLanguage();

  const {
    PRICE_LOW, PRICE_HIGH, CLEANING_FEE,
    PROMO_WEEK_LOW, PROMO_WEEK_HIGH,
    PROMO_MONTH_LOW, PROMO_MONTH_HIGH,
    DAYS_IN_WEEK = 7, DAYS_IN_MONTH = 30,
    EXTRA_PERSON_3, EXTRA_PERSON_4,
    MIN_PEOPLE = 1, MAX_PEOPLE = 4,
    unavailableRanges = []
  } = pricingConfig;

  const [selection, setSelection] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }]);
  const [validDates, setValidDates] = useState(false);
  const [numPeople, setNumPeople] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const disabledDates = useMemo(() => {
    return unavailableRanges.flatMap(range => {
      const start = typeof range.start === 'string' ? new Date(range.start) : new Date(range.startDate);
      const end = typeof range.end === 'string' ? new Date(range.end) : new Date(range.endDate);
      const dates = [];
      const current = new Date(start);
      while (current <= end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      return dates;
    });
  }, [unavailableRanges]);

  const calculateNights = useCallback(() => {
    const { startDate, endDate } = selection[0];
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  }, [selection]);

  const handleSelect = (ranges) => {
    const newSelection = ranges.selection;
    setSelection([newSelection]);
    const nights = Math.ceil((newSelection.endDate - newSelection.startDate) / (1000 * 60 * 60 * 24));
    setValidDates(nights >= 2);
  };

  const computePrice = useCallback(() => {
    const { startDate, endDate } = selection[0];
    const nights = calculateNights();
    if (nights < 2) return null;

    const allDates = eachDayOfInterval({ start: startDate, end: new Date(endDate.getTime() - 1) });
    let total = 0;
    let remainingDates = [...allDates];

    const fullMonths = Math.floor(remainingDates.length / DAYS_IN_MONTH);
    const monthBlockDates = remainingDates.slice(0, fullMonths * DAYS_IN_MONTH);
    const monthHigh = monthBlockDates.filter(d => isHighSeason(d)).length;
    const monthLow = monthBlockDates.length - monthHigh;
    const monthTotal = (PROMO_MONTH_HIGH / DAYS_IN_MONTH) * monthHigh + (PROMO_MONTH_LOW / DAYS_IN_MONTH) * monthLow;
    if (fullMonths > 0) total += monthTotal;
    remainingDates = remainingDates.slice(fullMonths * DAYS_IN_MONTH);

    const fullWeeks = Math.floor(remainingDates.length / DAYS_IN_WEEK);
    const weekBlockDates = remainingDates.slice(0, fullWeeks * DAYS_IN_WEEK);
    const weekHigh = weekBlockDates.filter(d => isHighSeason(d)).length;
    const weekLow = weekBlockDates.length - weekHigh;
    const weekTotal = weekHigh * (PROMO_WEEK_HIGH / DAYS_IN_WEEK) + weekLow * (PROMO_WEEK_LOW / DAYS_IN_WEEK);
    total += weekTotal;
    remainingDates = remainingDates.slice(fullWeeks * DAYS_IN_WEEK);

    const extraDays = remainingDates.map(d => ({
      date: d,
      price: isHighSeason(d) ? PRICE_HIGH : PRICE_LOW,
      isHigh: isHighSeason(d),
    }));
    const extrasTotal = extraDays.reduce((acc, d) => acc + d.price, 0);
    total += extrasTotal;

    const extraPerNight = (numPeople >= 4 ? EXTRA_PERSON_4 : 0) + (numPeople >= 3 ? EXTRA_PERSON_3 : 0);
    const totalExtrasPeople = extraPerNight * nights;
    total += totalExtrasPeople;

    const finalTotal = Math.round(total + CLEANING_FEE);

    return {
      finalTotal, nights, allDates,
      fullMonths, monthTotal: Math.round(monthTotal), monthHigh, monthLow,
      fullWeeks, weekTotal: Math.round(weekTotal), weekHigh, weekLow,
      extraDays, extrasTotal,
      extraPerNight, totalExtrasPeople,
    };
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
    EXTRA_PERSON_4
  ]);

  const priceResult = useMemo(() => computePrice(), [computePrice]);
  const finalTotal = priceResult?.finalTotal || 0;

  const messageBody = useMemo(() => {
    if (!validDates || !priceResult) return '';
    const { startDate, endDate } = selection[0];
    const text = language === 'pt'
      ? `Exmo. Senhor Nuno,\n\nVenho por este meio demonstrar o meu interesse em reservar o seu apartamento para as seguintes datas:\nCheck-in: ${format(startDate, 'dd/MM/yyyy')}\nCheck-out: ${format(endDate, 'dd/MM/yyyy')}\nNúmero de noites: ${priceResult.nights}\nNúmero de pessoas: ${numPeople}\n\nGostaria de confirmar se o alojamento se encontra disponível.\nAguardo resposta com os próximos passos.\n\nCom os melhores cumprimentos,\n[O SEU NOME]\n[O SEU CONTACTO]`
      : `Dear Mr. Nuno,\n\nI would like to express my interest in booking your apartment for the following dates:\nCheck-in: ${format(startDate, 'dd/MM/yyyy')}\nCheck-out: ${format(endDate, 'dd/MM/yyyy')}\nNumber of nights: ${priceResult.nights}\nNumber of guests: ${numPeople}\n\nI would like to confirm availability.\nLooking forward to your reply.\n\nBest regards,\n[YOUR NAME]\n[YOUR CONTACT]`;
    return encodeURIComponent(text);
  }, [validDates, priceResult, selection, numPeople, language]);

  const dateLocale = language === 'pt' ? pt : enUS;

  return (
    <div className="sidebar-box">
      <h3 className="sidebar-title">{t('sim.title')}</h3>

      <div className="sidebar-calendar">
        <DateRange
          locale={dateLocale}
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={selection}
          minDate={new Date()}
          disabledDates={disabledDates}
          rangeColors={['#1c3a4f']}
        />
      </div>

      <div className="sidebar-info">
        <div className="sidebar-info-row">
          <span className="sidebar-label">{t('sim.checkIn')}:</span>
          <span className="sidebar-value">{format(selection[0].startDate, 'dd/MM/yyyy')}</span>
        </div>
        <div className="sidebar-info-row">
          <span className="sidebar-label">{t('sim.checkOut')}:</span>
          <span className="sidebar-value">{format(selection[0].endDate, 'dd/MM/yyyy')}</span>
        </div>
        <div className="sidebar-info-row">
          <span className="sidebar-label">{t('sim.nights')}:</span>
          <span className="sidebar-value">{calculateNights()}</span>
        </div>
        <div className="sidebar-info-row sidebar-price-row">
          <span className="sidebar-label">{t('sim.estimatedPrice')}:</span>
          <span className="sidebar-value sidebar-price">
            {validDates ? `€${finalTotal}` : t('sim.minNights')}
          </span>
        </div>

        <div className="sidebar-people">
          <span className="sidebar-label">{t('sim.numPeople')}:</span>
          <div className="people-controls">
            <button
              className="people-btn"
              onClick={() => setNumPeople(p => Math.max(MIN_PEOPLE, p - 1))}
              disabled={numPeople <= MIN_PEOPLE}
              aria-label="Decrease"
            >
              <Minus size={16} />
            </button>
            <span className="people-count">{numPeople}</span>
            <button
              className="people-btn"
              onClick={() => setNumPeople(p => Math.min(MAX_PEOPLE, p + 1))}
              disabled={numPeople >= MAX_PEOPLE}
              aria-label="Increase"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {validDates && (
        <button className="sidebar-proceed-btn" onClick={() => setShowSummary(true)}>
          {t('sim.proceed')}
        </button>
      )}

      <Modal isOpen={showSummary} onClose={() => setShowSummary(false)} title={t('sim.summary')}>
        <div className="sim-summary">
          <div className="sim-row">
            <strong>{t('sim.checkIn')}:</strong> {format(selection[0].startDate, 'dd/MM/yyyy')}
          </div>
          <div className="sim-row">
            <strong>{t('sim.checkOut')}:</strong> {format(selection[0].endDate, 'dd/MM/yyyy')}
          </div>
          <div className="sim-row">
            <strong>{t('sim.nights')}:</strong> {priceResult?.nights}
          </div>
          <div className="sim-row">
            <strong>{t('sim.numPeople')}:</strong> {numPeople}
            <small> ({t('sim.priceNote')})</small>
          </div>
          <div className="sim-row sim-total">
            <strong>{t('sim.estimatedPrice')}:</strong> €{finalTotal}
          </div>

          <div className="modal-actions">
            <a
              href={`mailto:${CONTACT.email}?subject=Pedido de reserva 5 Steps House&body=${messageBody}`}
              target="_blank"
              rel="noreferrer"
              className="sim-btn sim-btn-email"
            >
              <Mail size={18} /> {t('sim.emailBtn')}
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${messageBody}`}
              target="_blank"
              rel="noreferrer"
              className="sim-btn sim-btn-whatsapp"
            >
              <MessageCircle size={18} /> {t('sim.whatsappBtn')}
            </a>
            <button
              className="sim-btn sim-btn-details"
              onClick={() => {
                setShowSummary(false);
                setShowDetails(true);
              }}
            >
              <FileText size={18} /> {t('sim.viewDetails')}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)} title={t('sim.details')}>
        {priceResult && (
          <div className="sim-details">
            <p><strong>{t('sim.totalNights')}:</strong> {priceResult.nights}</p>
            <ul className="sim-dates-list">
              {priceResult.allDates.map((date, idx) => (
                <li key={idx}>
                  {format(date, 'dd/MM/yyyy')} — {isHighSeason(date)
                    ? `${t('apt.seasonHigh')} (€${PRICE_HIGH})`
                    : `${t('apt.seasonLow')} (€${PRICE_LOW})`
                  }
                </li>
              ))}
            </ul>
            <hr />
            <p><strong>{t('sim.promoApplied')}:</strong></p>
            {priceResult.fullMonths > 0 && <p>{priceResult.fullMonths} {t('sim.months')} → €{priceResult.monthTotal}</p>}
            {priceResult.fullWeeks > 0 && <p>{priceResult.fullWeeks} {t('sim.weeks')} → €{priceResult.weekTotal}</p>}
            {priceResult.extraDays.length > 0 && (
              <div>
                <p>{t('sim.extraNights')}:</p>
                <ul>
                  {priceResult.extraDays.map((d, i) => (
                    <li key={i}>
                      {format(d.date, 'dd/MM/yyyy')} — {d.isHigh ? t('apt.seasonHigh') : t('apt.seasonLow')} → €{d.price}
                    </li>
                  ))}
                </ul>
                <p>{t('sim.totalExtraNights')}: €{priceResult.extrasTotal}</p>
              </div>
            )}
            {priceResult.extraPerNight > 0 && (
              <p>
                {t('sim.extraPerson')}: €{priceResult.extraPerNight}/{t('apt.perNight').replace('/', '')} × {priceResult.nights} = €{priceResult.totalExtrasPeople}
              </p>
            )}
            <p>{t('apt.cleaningFee')}: €{CLEANING_FEE}</p>
            <h4 className="sim-final-total">{t('sim.finalTotal')}: €{priceResult.finalTotal}</h4>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AvailabilitySidebar;