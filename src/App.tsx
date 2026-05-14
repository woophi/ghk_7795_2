import { BottomSheet } from '@alfalab/core-components/bottom-sheet/cssm';
import { Button } from '@alfalab/core-components/button/cssm';
import { Gap } from '@alfalab/core-components/gap/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Slider } from '@alfalab/core-components/slider/cssm';
import { Tag } from '@alfalab/core-components/tag/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { useEffect, useMemo, useRef, useState } from 'react';
import c1Img from './assets/c1.png';
import c2Img from './assets/c2.png';
import c31Img from './assets/c3.png';
import polisImg from './assets/polis.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { round } from './utils/round';

const items = [
  {
    title: 'Гарантированный доход',
    subtitle: 'Размер дохода фиксирован и гарантирован условиями договора',
    img: c1Img,
  },
  {
    title: 'Защита капитала',
    subtitle: 'Гарантированный доход и взносы выплачиваются в полном объеме в конце срока действия договора',
    img: c2Img,
  },
  {
    title: 'Преимущества программы',
    subtitle: 'Страховое покрытие, юридическая защита и адресная передача капитала',
    img: c31Img,
  },
];

const SLIDER_SUM = {
  default: 100_000,
  min: 30_000,
  max: 10_000_000,
  step: 1_000,
};

const INCOME_RATE = 0.146;
const TERM_IN_MONTHS = 3;

export const App = () => {
  const [view, setView] = useState<'init' | 'conditions'>('init');
  const [openBs, setOpenBs] = useState(false);
  const [bsContent, setBsContent] = useState<'about' | 'details'>('about');
  const [sliderSum, setSliderSum] = useState(SLIDER_SUM.default);
  const pageOpenAtRef = useRef(Date.now());
  const expectedIncome = round((sliderSum * INCOME_RATE * TERM_IN_MONTHS) / 12, 2);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
    window.gtag('event', '7795_landing_impression', { var: 'var2' });
  }, []);

  const submit = () => {
    const timeOnPage = Math.floor((Date.now() - pageOpenAtRef.current) / 1000).toString();

    window.gtag('event', '7795_buy_click', { var: 'var2', size: sliderSum.toString(), time_on_page: timeOnPage });
    window.location.replace(
      'alfabank://multistep-route?fromModule=SIGN_ONLINE&stepNumber=0&alias=invest-partners-order-alias&version=2&productId=202987',
    );
  };

  const bsContentView = useMemo(() => {
    switch (bsContent) {
      case 'about':
        return (
          <>
            <Typography.Title tag="h3" view="xsmall" weight="semibold">
              Fort Knox, 3 месяца
            </Typography.Title>
            <Typography.Text view="primary-medium">
              Зафиксируйте повышенную ставку дохода 14,60% годовых и оставайтесь под страховой защитой
            </Typography.Text>
            <Gap size={1} />
            <Typography.Title tag="h3" view="xsmall" weight="semibold">
              Преимущества
            </Typography.Title>
            <Typography.Text view="primary-medium">
              • Инвестиционное решение в оболочке страхового полиса от финансовых экспертов
              <br />
              • Гарантированный доход в конце срока
              <br />
              • Юридическая защита капитала от любых притязаний
              <br />
              • Адресная передача средств
              <br />• Выплаты близким в страховых случаях
            </Typography.Text>
            <Gap size={1} />
            <Typography.Title tag="h3" view="xsmall" weight="semibold">
              Как это работает
            </Typography.Title>
            <Typography.Text view="primary-medium">
              • Вы размещаете денежные средства на установленный в договоре срок.
              <br />
              • Размер дохода фиксирован и гарантирован.
              <br />• В конце программы вы получаете всю внесенную сумму и гарантированный доход.
            </Typography.Text>
            <Gap size={1} />
            <Typography.Text view="primary-medium" style={{ fontStyle: 'italic' }}>
              Предложение действительно ограниченное время. Если вы уже оформляли договор страхования ранее — актуальные
              параметры ищите в вашем Договоре страхования.
            </Typography.Text>
          </>
        );
      case 'details':
        return (
          <>
            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Взнос
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                от 30 000 ₽
              </Typography.Text>
            </div>
            <Gap size={1} />

            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Срок программы
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                3 месяца
              </Typography.Text>
            </div>
            <Gap size={1} />

            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Риск
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                Ультра-консервативный
              </Typography.Text>
            </div>
            <Gap size={1} />

            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Размер купона
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                3,65% за 3 месяца
              </Typography.Text>
            </div>
            <Gap size={1} />

            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Выплаты купона
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                В конце срока
              </Typography.Text>
            </div>
            <Gap size={1} />

            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Защита капитала
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                Полная
              </Typography.Text>
            </div>
          </>
        );
    }
  }, [bsContent]);

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive
          style={{ marginTop: '1rem', textAlign: 'center' }}
          tag="h1"
          view="xsmall"
          weight="semibold"
        >
          Полис Fort Knox
        </Typography.TitleResponsive>

        <div style={{ padding: '0 20px' }}>
          <Tag view="transparent" size={40} shape="rounded" checked={view === 'init'} onClick={() => setView('init')}>
            Обзор
          </Tag>
          <Tag
            view="transparent"
            size={40}
            shape="rounded"
            checked={view === 'conditions'}
            onClick={() => {
              window.gtag('event', '7795_conditions_click', { var: 'var2' });
              setView('conditions');
            }}
          >
            Условия
          </Tag>
        </div>

        {view === 'init' ? (
          <div className={appSt.boxWrap}>
            <div className={appSt.box}>
              <Typography.TitleResponsive tag="h2" view="small" weight="semibold">
                О полисе
              </Typography.TitleResponsive>

              <PureCell>
                <PureCell.Graphics verticalAlign="center">
                  <img src={polisImg} width={48} height={48} alt="polis" />
                </PureCell.Graphics>
                <PureCell.Content>
                  <PureCell.Main>
                    <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                      Fort Knox, 3 мес
                    </Typography.Text>
                  </PureCell.Main>
                </PureCell.Content>
              </PureCell>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                Инвестиции с гарантированным доходом 14,60% годовых и страховой составляющей&nbsp;…
              </Typography.Text>

              <Button
                view="secondary"
                block
                size={40}
                onClick={() => {
                  window.gtag('event', '7795_insurance_about_click', { var: 'var2' });

                  setOpenBs(true);
                  setBsContent('about');
                }}
              >
                Подробнее
              </Button>
            </div>
            <div className={appSt.box}>
              <Typography.TitleResponsive tag="h2" view="small" weight="semibold">
                Основное
              </Typography.TitleResponsive>

              <div>
                <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                  Взнос
                </Typography.Text>
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  от 30 000 ₽
                </Typography.Text>
              </div>
              <div>
                <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                  Выплаты купона
                </Typography.Text>
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  В конце срока
                </Typography.Text>
              </div>

              <Button
                view="secondary"
                block
                size={40}
                onClick={() => {
                  window.gtag('event', '7795_main_about_click', { var: 'var2' });

                  setOpenBs(true);
                  setBsContent('details');
                }}
              >
                Подробнее
              </Button>
            </div>

            <div className={appSt.box}>
              <Typography.TitleResponsive tag="h2" view="small" weight="semibold">
                Расчитайте доход
              </Typography.TitleResponsive>

              <div className={appSt.boxCalc}>
                <div className={appSt.row}>
                  <div>
                    <Typography.TitleResponsive tag="h2" view="xlarge" weight="medium">
                      {expectedIncome.toLocaleString('ru')} ₽
                    </Typography.TitleResponsive>
                    <Typography.Text view="primary-small" color="secondary">
                      Ваш доход
                    </Typography.Text>
                  </div>

                  <div className={appSt.tag}>
                    <Typography.Text view="primary-small">3 месяца</Typography.Text>
                  </div>
                </div>

                <div>
                  <div className={appSt.row}>
                    <Typography.Text view="primary-small" color="secondary">
                      Взнос
                    </Typography.Text>
                    <Typography.Text view="primary-medium" weight="medium">
                      {sliderSum.toLocaleString('ru')} ₽
                    </Typography.Text>
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <Slider
                      size={4}
                      value={sliderSum}
                      step={SLIDER_SUM.step}
                      min={SLIDER_SUM.min}
                      max={SLIDER_SUM.max}
                      onChange={({ value }) => setSliderSum(value)}
                      onEnd={() => {
                        window.gtag('event', '7795_calculator_click');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={appSt.box}>
              <Typography.TitleResponsive tag="h2" view="small" weight="semibold">
                Почему стоит инвестировать
              </Typography.TitleResponsive>

              {items.map((item, index) => (
                <PureCell key={index}>
                  <PureCell.Graphics verticalAlign="center">
                    <img src={item.img} width={48} height={48} alt="check" />
                  </PureCell.Graphics>
                  <PureCell.Content>
                    <PureCell.Main>
                      <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                        {item.title}
                      </Typography.Text>
                      <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                        {item.subtitle}
                      </Typography.Text>
                    </PureCell.Main>
                  </PureCell.Content>
                </PureCell>
              ))}
            </div>
          </div>
        ) : (
          <div className={appSt.box}>
            <Typography.Title tag="h2" view="small" weight="semibold">
              Характеристики
            </Typography.Title>
            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Валюта
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                Рубли
              </Typography.Text>
            </div>
            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Риск
              </Typography.Text>
              <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                Ультра-консервативный
              </Typography.Text>
            </div>
          </div>
        )}
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <Button block view="primary" onClick={submit}>
          Купить
        </Button>
      </div>

      <BottomSheet
        open={openBs}
        onClose={() => {
          setOpenBs(false);
        }}
        hasCloser
        title={bsContent === 'about' ? 'О полисе' : 'Основное'}
        titleAlign="left"
        stickyHeader
      >
        <div className={appSt.container}>{bsContentView}</div>
      </BottomSheet>
    </>
  );
};
