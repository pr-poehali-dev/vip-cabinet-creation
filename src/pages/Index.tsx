import { useState } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconName = any;

type Tab = "profile" | "subscriptions" | "support";
type ProfileTab = "info" | "password";

const tabs = [
  { id: "profile" as Tab, label: "Мои данные", icon: "User" },
  { id: "subscriptions" as Tab, label: "Мои подписки", icon: "CreditCard" },
  { id: "support" as Tab, label: "Поддержка", icon: "MessageCircle" },
];

const faqs = [
  {
    q: "Как изменить тарифный план?",
    a: "Перейдите в раздел «Мои подписки» и нажмите «Сменить тариф». Переход происходит мгновенно, разница в стоимости пересчитывается автоматически.",
  },
  {
    q: "Как получить счёт для бухгалтерии?",
    a: "Счета и акты формируются автоматически после каждого платежа и отправляются на ваш email. Также их можно скачать в разделе истории платежей.",
  },
  {
    q: "Что происходит при отмене подписки?",
    a: "Доступ ко всем функциям сохраняется до конца оплаченного периода. После истечения проект переходит в режим «Только чтение».",
  },
  {
    q: "Можно ли получить возврат средств?",
    a: "Да, в течение 14 дней с момента оплаты. Для оформления возврата напишите в поддержку с указанием номера платежа.",
  },
  {
    q: "Как привязать свой домен?",
    a: "В настройках проекта выберите «Опубликовать → Привязать домен», введите ваш домен и следуйте инструкции по настройке DNS-записей.",
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profileTab, setProfileTab] = useState<ProfileTab>("info");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [supportSent, setSupportSent] = useState(false);

  // Прогресс тарифа: 18 из 30 дней использовано
  const daysUsed = 18;
  const daysTotal = 30;
  const daysLeft = daysTotal - daysUsed;
  const progress = Math.round((daysUsed / daysTotal) * 100);

  return (
    <div className="min-h-screen mesh-bg bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-pink-500/6 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 animate-fade-in-up">
          <div>
            <p className="text-sm text-muted-foreground font-display uppercase tracking-widest mb-1">Личный кабинет</p>
            <h1 className="text-4xl font-display font-black gradient-text leading-tight">
              Привет, Алексей!
            </h1>
          </div>
          <div className="animate-float">
            <div className="w-16 h-16 rounded-2xl glass neon-border animate-pulse-glow flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div className="glass rounded-2xl p-1.5 flex gap-1 mb-8 animate-fade-in-up delay-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-display font-semibold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "glass-active text-purple-300 neon-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon name={tab.icon as IconName} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-slide-tab" key={activeTab}>

          {/* ===== МОИ ДАННЫЕ ===== */}
          {activeTab === "profile" && (
            <div className="glass rounded-3xl overflow-hidden hover-lift">
              {/* Inner tab switcher */}
              <div className="flex border-b border-white/8">
                {[
                  { id: "info" as ProfileTab, label: "Личные данные", icon: "UserRound" },
                  { id: "password" as ProfileTab, label: "Изменить пароль", icon: "Lock" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setProfileTab(t.id); setEditing(false); }}
                    className={`flex items-center gap-2 px-6 py-4 font-display font-semibold text-sm border-b-2 transition-all duration-200 ${
                      profileTab === t.id
                        ? "border-purple-500 text-purple-300 bg-purple-500/8"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon name={t.icon as IconName} size={15} />
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Личные данные */}
              {profileTab === "info" && (
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-6 mb-8">
                    {/* Avatar */}
                    <div className="shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg">
                        👤
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display font-bold text-xl text-foreground">Алексей Петров</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">alexey@example.com</p>
                      <span className="inline-flex items-center gap-1.5 mt-2 text-xs text-green-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                        Аккаунт активен
                      </span>
                    </div>
                    <button
                      onClick={() => setEditing(!editing)}
                      className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm transition-all duration-200 ${
                        editing
                          ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                          : "glass text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon name={editing ? "Check" : "Pencil"} size={14} />
                      {editing ? "Сохранить" : "Редактировать"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* ФИО */}
                    <div className="md:col-span-2">
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Icon name="User" size={11} />
                        ФИО
                      </label>
                      {editing ? (
                        <input
                          defaultValue="Петров Алексей Иванович"
                          className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-foreground font-medium text-sm outline-none focus:border-purple-500/60 transition-all"
                        />
                      ) : (
                        <div className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-foreground font-medium text-sm">
                          Петров Алексей Иванович
                        </div>
                      )}
                    </div>

                    {/* Почта */}
                    <div>
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Icon name="Mail" size={11} />
                        Электронная почта
                      </label>
                      {editing ? (
                        <input
                          defaultValue="alexey@example.com"
                          type="email"
                          className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-foreground font-medium text-sm outline-none focus:border-purple-500/60 transition-all"
                        />
                      ) : (
                        <div className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-foreground font-medium text-sm">
                          alexey@example.com
                        </div>
                      )}
                    </div>

                    {/* Телефон */}
                    <div>
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Icon name="Phone" size={11} />
                        Телефон
                      </label>
                      {editing ? (
                        <input
                          defaultValue="+7 (999) 123-45-67"
                          type="tel"
                          className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-foreground font-medium text-sm outline-none focus:border-purple-500/60 transition-all"
                        />
                      ) : (
                        <div className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-foreground font-medium text-sm">
                          +7 (999) 123-45-67
                        </div>
                      )}
                    </div>
                  </div>

                  {editing && (
                    <div className="mt-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2">
                      <Icon name="Info" size={14} className="text-yellow-400 shrink-0" />
                      <p className="text-xs text-yellow-300">При изменении почты потребуется подтверждение на новый адрес</p>
                    </div>
                  )}
                </div>
              )}

              {/* Изменение пароля */}
              {profileTab === "password" && (
                <div className="p-6 md:p-8 max-w-md">
                  <h2 className="font-display font-bold text-lg text-foreground mb-1">Изменить пароль</h2>
                  <p className="text-sm text-muted-foreground mb-6">Последнее изменение: 3 месяца назад</p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 block">
                        Текущий пароль
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-purple-500/50 transition-all placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 block">
                        Новый пароль
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-purple-500/50 transition-all placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 block">
                        Повторите новый пароль
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-purple-500/50 transition-all placeholder:text-muted-foreground/50"
                      />
                    </div>

                    <div className="pt-1">
                      <p className="text-xs text-muted-foreground mb-2">Требования к паролю:</p>
                      <ul className="space-y-1">
                        {[
                          "Минимум 8 символов",
                          "Минимум одна цифра",
                          "Минимум одна заглавная буква",
                        ].map((req) => (
                          <li key={req} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Icon name="Dot" size={12} className="text-purple-400" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-display font-bold text-sm hover:opacity-90 transition-opacity mt-2">
                      Сохранить новый пароль
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== МОИ ПОДПИСКИ ===== */}
          {activeTab === "subscriptions" && (
            <div className="space-y-5">
              {/* Текущий тариф — главная карточка */}
              <div className="glass rounded-3xl p-6 md:p-8 hover-lift neon-border animate-pulse-glow">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                        <Icon name="Sparkles" size={22} className="text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-display font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                            Активна
                          </span>
                          <span className="text-xs text-muted-foreground">Текущий тариф</span>
                        </div>
                        <h2 className="font-display font-black text-2xl text-foreground mt-0.5">Профессиональный</h2>
                      </div>
                    </div>

                    <p className="text-3xl font-display font-black gradient-text mb-5">2 490 ₽<span className="text-lg font-semibold text-muted-foreground">/месяц</span></p>

                    {/* Progress bar */}
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-display">Осталось дней</span>
                      <span className="font-display font-bold text-foreground">{daysLeft} из {daysTotal}</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/8 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-700"
                        style={{ width: `${100 - progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Следующее списание: <span className="text-foreground font-medium">15 мая 2026</span></p>
                  </div>

                  {/* Right — кнопки */}
                  <div className="flex flex-col gap-3 md:w-52 shrink-0">
                    <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-display font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Icon name="RefreshCw" size={15} />
                      Продлить подписку
                    </button>
                    <button className="w-full py-3 px-4 rounded-xl glass border border-white/15 text-foreground font-display font-semibold text-sm hover:bg-white/8 transition-all flex items-center justify-center gap-2">
                      <Icon name="ArrowLeftRight" size={15} className="text-cyan-400" />
                      Сменить тариф
                    </button>
                    <button className="w-full py-3 px-4 rounded-xl glass border border-white/10 text-muted-foreground font-display font-semibold text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                      <Icon name="Settings2" size={15} />
                      Управление
                    </button>
                  </div>
                </div>
              </div>

              {/* Возможности тарифа */}
              <div className="glass rounded-3xl p-6 hover-lift">
                <h3 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
                  <Icon name="Zap" size={18} className="text-yellow-400" />
                  Возможности тарифа
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { icon: "Infinity", label: "Безлимитные проекты", desc: "Создавайте сколько угодно сайтов" },
                    { icon: "Headphones", label: "Приоритетная поддержка", desc: "Ответ в течение 2 часов" },
                    { icon: "Code2", label: "API доступ", desc: "Полный доступ к API платформы" },
                    { icon: "HardDrive", label: "50 GB хранилища", desc: "Для файлов и изображений" },
                    { icon: "Globe", label: "Кастомный домен", desc: "Подключите свой домен бесплатно" },
                    { icon: "BarChart2", label: "Расширенная аналитика", desc: "Детальная статистика посещений" },
                  ].map((f) => (
                    <div key={f.label} className="flex items-start gap-3 p-4 rounded-2xl bg-white/3 border border-white/6 hover:bg-white/6 transition-all">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name={f.icon as IconName} size={15} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-sm text-foreground">{f.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Другие тарифы */}
              <div className="glass rounded-3xl p-6 hover-lift">
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Layers" size={18} className="text-cyan-400" />
                  Другие тарифы
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Базовый",
                      price: "990 ₽/мес",
                      features: ["5 проектов", "5 GB хранилища", "Email поддержка"],
                      color: "from-blue-500 to-indigo-500",
                      current: false,
                    },
                    {
                      name: "Корпоративный",
                      price: "7 990 ₽/мес",
                      features: ["Безлимит всего", "Персональный менеджер", "SLA 99.9%"],
                      color: "from-amber-500 to-orange-500",
                      current: false,
                    },
                  ].map((plan) => (
                    <div key={plan.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/3 border border-white/6 hover:bg-white/6 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                          <Icon name="Star" size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-sm text-foreground">{plan.name}</p>
                          <p className="text-xs text-muted-foreground">{plan.features.slice(0, 2).join(" · ")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-sm text-foreground">{plan.price}</p>
                        <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors mt-0.5 font-display font-medium">
                          Перейти →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== ПОДДЕРЖКА ===== */}
          {activeTab === "support" && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left col: форма + способы связи */}
              <div className="lg:col-span-3 space-y-5">
                {/* Форма */}
                <div className="glass rounded-3xl p-6 hover-lift">
                  <h2 className="font-display font-bold text-xl text-foreground mb-1">Написать сообщение</h2>
                  <p className="text-sm text-muted-foreground mb-6">Ответим в течение 2 часов в рабочее время (пн–пт, 9–18 МСК)</p>

                  {!supportSent ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 block">Тема обращения</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer">
                          <option value="" className="bg-[#0f0f1a]">Выберите тему</option>
                          <option value="billing" className="bg-[#0f0f1a]">Вопрос по оплате</option>
                          <option value="tech" className="bg-[#0f0f1a]">Техническая проблема</option>
                          <option value="account" className="bg-[#0f0f1a]">Вопрос по аккаунту</option>
                          <option value="tariff" className="bg-[#0f0f1a]">Вопрос по тарифу</option>
                          <option value="other" className="bg-[#0f0f1a]">Другое</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 block">Сообщение</label>
                        <textarea
                          rows={5}
                          placeholder="Опишите вашу проблему или вопрос как можно подробнее..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-muted-foreground/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2 block">Приоритет</label>
                        <div className="flex gap-2">
                          {[
                            { label: "Обычный", color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
                            { label: "Срочный", color: "text-orange-400 border-orange-400/30 bg-orange-400/10" },
                            { label: "Критический", color: "text-red-400 border-red-400/30 bg-red-400/10" },
                          ].map((p, i) => (
                            <label key={p.label} className="flex-1 cursor-pointer">
                              <input type="radio" name="priority" defaultChecked={i === 0} className="sr-only peer" />
                              <div className={`text-center py-2 px-3 rounded-xl border text-xs font-display font-semibold transition-all peer-checked:ring-2 peer-checked:ring-purple-500/50 ${p.color} hover:opacity-90 cursor-pointer`}>
                                {p.label}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setSupportSent(true)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-display font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <Icon name="Send" size={15} />
                        Отправить обращение
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                        <Icon name="CheckCircle" size={28} className="text-green-400" />
                      </div>
                      <p className="font-display font-bold text-lg text-foreground mb-1">Обращение отправлено!</p>
                      <p className="text-sm text-muted-foreground mb-5">Номер вашего обращения: <span className="text-purple-400 font-medium">#SUP-2847</span></p>
                      <button
                        onClick={() => setSupportSent(false)}
                        className="px-5 py-2.5 rounded-xl glass text-muted-foreground hover:text-foreground font-display font-semibold text-sm transition-all"
                      >
                        Новое обращение
                      </button>
                    </div>
                  )}
                </div>

                {/* Другие способы связи */}
                <div className="glass rounded-3xl p-6 hover-lift">
                  <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Phone" size={17} className="text-pink-400" />
                    Другие способы связи
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        icon: "Send",
                        label: "Telegram",
                        value: "@support_bot",
                        desc: "Быстрые ответы онлайн",
                        color: "from-blue-400 to-cyan-400",
                        bg: "bg-blue-500/10 border-blue-500/20",
                      },
                      {
                        icon: "Mail",
                        label: "Email",
                        value: "help@company.ru",
                        desc: "Для официальных запросов",
                        color: "from-purple-400 to-pink-400",
                        bg: "bg-purple-500/10 border-purple-500/20",
                      },
                      {
                        icon: "Phone",
                        label: "Телефон",
                        value: "+7 (800) 555-35-35",
                        desc: "Пн–Пт, 9:00–18:00 МСК",
                        color: "from-green-400 to-emerald-400",
                        bg: "bg-green-500/10 border-green-500/20",
                      },
                      {
                        icon: "MessageSquare",
                        label: "ВКонтакте",
                        value: "vk.com/company",
                        desc: "Сообщество поддержки",
                        color: "from-indigo-400 to-blue-400",
                        bg: "bg-indigo-500/10 border-indigo-500/20",
                      },
                    ].map((c) => (
                      <div key={c.label} className={`flex items-center gap-3 p-4 rounded-2xl border ${c.bg} hover-lift cursor-pointer transition-all`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0`}>
                          <Icon name={c.icon as IconName} size={17} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-bold text-sm text-foreground">{c.label}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.value}</p>
                          <p className="text-[10px] text-muted-foreground/60 mt-0.5">{c.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right col: FAQ */}
              <div className="lg:col-span-2">
                <div className="glass rounded-3xl p-6 hover-lift sticky top-6">
                  <h3 className="font-display font-bold text-xl text-foreground mb-5 flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-cyan-400" />
                    Частые вопросы
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                          openFaq === i
                            ? "bg-purple-500/10 border border-purple-500/25"
                            : "bg-white/3 border border-white/6 hover:bg-white/6"
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-4 text-left gap-3"
                        >
                          <span className="font-display font-semibold text-sm text-foreground leading-snug">{faq.q}</span>
                          <Icon
                            name="ChevronDown"
                            size={15}
                            className={`text-purple-400 shrink-0 transition-transform duration-300 ${
                              openFaq === i ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openFaq === i && (
                          <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed animate-fade-in border-t border-white/8 pt-3">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* System status */}
                  <div className="mt-5 pt-5 border-t border-white/8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                      <p className="font-display font-bold text-sm text-foreground">Все системы работают</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["API", "Сайты", "База данных"].map((s) => (
                        <div key={s} className="bg-green-500/10 border border-green-500/20 rounded-xl py-2 text-center">
                          <p className="text-xs text-green-400 font-display font-semibold">{s}</p>
                          <p className="text-[10px] text-green-400/60 mt-0.5">Работает</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
