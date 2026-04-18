import { useState } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconName = any;

type Tab = "profile" | "subscriptions" | "support";

const tabs = [
  { id: "profile" as Tab, label: "Мои данные", icon: "User" },
  { id: "subscriptions" as Tab, label: "Мои подписки", icon: "CreditCard" },
  { id: "support" as Tab, label: "Поддержка", icon: "MessageCircle" },
];

const subscriptions = [
  {
    name: "Профессиональный",
    price: "2 490 ₽/мес",
    status: "active",
    expires: "15 мая 2026",
    features: ["Безлимитные проекты", "Приоритетная поддержка", "API доступ"],
    color: "from-purple-500 to-cyan-500",
    badge: "Активна",
  },
  {
    name: "Дополнительное хранилище",
    price: "490 ₽/мес",
    status: "active",
    expires: "15 мая 2026",
    features: ["100 GB хранилища", "CDN ускорение"],
    color: "from-pink-500 to-purple-500",
    badge: "Активна",
  },
  {
    name: "Базовый план",
    price: "990 ₽/мес",
    status: "expired",
    expires: "01 янв 2026",
    features: ["5 проектов", "Стандартная поддержка"],
    color: "from-gray-500 to-gray-600",
    badge: "Истекла",
  },
];

const faqs = [
  { q: "Как изменить тарифный план?", a: "Перейдите в раздел «Мои подписки» и нажмите «Изменить план». Смена тарифа происходит с нового расчётного периода." },
  { q: "Как получить счёт для бухгалтерии?", a: "Счета и акты формируются автоматически и отправляются на ваш email после каждого платежа." },
  { q: "Что происходит при отмене подписки?", a: "Доступ сохраняется до конца оплаченного периода. После — проект переходит в режим «Только чтение»." },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen mesh-bg bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-pink-500/6 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
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

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in-up delay-100">
          {[
            { label: "Проектов", value: "12", icon: "Layers", color: "text-purple-400" },
            { label: "Подписок", value: "2", icon: "Star", color: "text-cyan-400" },
            { label: "Дней с нами", value: "247", icon: "Calendar", color: "text-pink-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 hover-lift text-center">
              <Icon name={stat.icon as IconName} size={20} className={`${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-display font-black text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab nav */}
        <div className="glass rounded-2xl p-1.5 flex gap-1 mb-8 animate-fade-in-up delay-200">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Avatar card */}
              <div className="glass rounded-3xl p-6 flex flex-col items-center gap-4 hover-lift neon-border animate-pulse-glow">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-4xl shadow-lg">
                  👤
                </div>
                <div className="text-center">
                  <p className="font-display font-bold text-lg text-foreground">Алексей Петров</p>
                  <p className="text-sm text-muted-foreground">alexey@example.com</p>
                </div>
                <div className="w-full pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Статус</span>
                    <span className="flex items-center gap-1.5 text-green-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                      Активен
                    </span>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-display font-semibold text-sm hover:opacity-90 transition-opacity">
                  Изменить фото
                </button>
              </div>

              {/* Personal info */}
              <div className="lg:col-span-2 glass rounded-3xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-xl text-foreground">Личные данные</h2>
                  <button
                    onClick={() => setEditing(!editing)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm transition-all duration-200 ${
                      editing
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon name={editing ? "Check" : "Pencil"} size={14} />
                    {editing ? "Сохранить" : "Редактировать"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Имя", value: "Алексей", icon: "User" },
                    { label: "Фамилия", value: "Петров", icon: "User" },
                    { label: "Email", value: "alexey@example.com", icon: "Mail" },
                    { label: "Телефон", value: "+7 (999) 123-45-67", icon: "Phone" },
                    { label: "Город", value: "Москва", icon: "MapPin" },
                    { label: "Дата регистрации", value: "14 августа 2025", icon: "Calendar" },
                  ].map((field) => (
                    <div key={field.label} className="group">
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Icon name={field.icon as IconName} size={11} />
                        {field.label}
                      </label>
                      {editing && field.label !== "Дата регистрации" ? (
                        <input
                          defaultValue={field.value}
                          className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-2.5 text-foreground font-medium text-sm outline-none focus:border-purple-500/60 transition-all"
                        />
                      ) : (
                        <div className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-2.5 text-foreground font-medium text-sm">
                          {field.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Password section */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">Пароль</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Последнее изменение: 3 месяца назад</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-muted-foreground hover:text-foreground font-display font-semibold text-sm transition-all hover:bg-white/8">
                      <Icon name="Lock" size={14} />
                      Изменить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== МОИ ПОДПИСКИ ===== */}
          {activeTab === "subscriptions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-foreground">Мои подписки</h2>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-display font-semibold text-sm hover:opacity-90 transition-opacity">
                  <Icon name="Plus" size={15} />
                  Добавить план
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {subscriptions.map((sub, i) => (
                  <div
                    key={i}
                    className={`glass rounded-3xl p-6 hover-lift flex flex-col gap-4 ${
                      sub.status === "expired" ? "opacity-60" : ""
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sub.color} flex items-center justify-center`}
                      >
                        <Icon name="Sparkles" size={20} className="text-white" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-display font-bold ${
                          sub.status === "active"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                        }`}
                      >
                        {sub.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-lg text-foreground">{sub.name}</h3>
                      <p className="text-2xl font-display font-black gradient-text mt-1">{sub.price}</p>
                    </div>

                    <ul className="space-y-2 flex-1">
                      {sub.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={13} className="text-purple-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                        <Icon name="Clock" size={11} />
                        {sub.status === "active" ? "Продлится" : "Истекла"}: {sub.expires}
                      </p>
                      {sub.status === "active" ? (
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-foreground font-display font-semibold text-xs hover:bg-white/10 transition-all">
                            Управление
                          </button>
                          <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-display font-semibold text-xs hover:opacity-90 transition-opacity">
                            Продлить
                          </button>
                        </div>
                      ) : (
                        <button className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground font-display font-semibold text-xs hover:bg-white/10 transition-all">
                          Возобновить
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Billing info */}
              <div className="glass rounded-3xl p-6 hover-lift">
                <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Receipt" size={18} className="text-purple-400" />
                  История платежей
                </h3>
                <div className="space-y-3">
                  {[
                    { date: "15 апр 2026", desc: "Профессиональный план", amount: "2 490 ₽" },
                    { date: "15 апр 2026", desc: "Доп. хранилище", amount: "490 ₽" },
                    { date: "15 мар 2026", desc: "Профессиональный план", amount: "2 490 ₽" },
                    { date: "15 мар 2026", desc: "Доп. хранилище", amount: "490 ₽" },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/6 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center">
                          <Icon name="CheckCircle" size={14} className="text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.desc}</p>
                          <p className="text-xs text-muted-foreground">{p.date}</p>
                        </div>
                      </div>
                      <span className="font-display font-bold text-foreground">{p.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== ПОДДЕРЖКА ===== */}
          {activeTab === "support" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact card */}
              <div className="space-y-5">
                <div className="glass rounded-3xl p-6 hover-lift neon-border animate-pulse-glow">
                  <h2 className="font-display font-bold text-xl text-foreground mb-2">Написать в поддержку</h2>
                  <p className="text-sm text-muted-foreground mb-5">Ответим в течение 2 часов в рабочее время</p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1.5 block">Тема</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-purple-500/50 transition-all appearance-none">
                        <option value="" className="bg-gray-900">Выберите тему</option>
                        <option value="billing" className="bg-gray-900">Вопрос по оплате</option>
                        <option value="tech" className="bg-gray-900">Техническая проблема</option>
                        <option value="account" className="bg-gray-900">Вопрос по аккаунту</option>
                        <option value="other" className="bg-gray-900">Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1.5 block">Сообщение</label>
                      <textarea
                        rows={5}
                        placeholder="Опишите вашу проблему или вопрос..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-muted-foreground"
                      />
                    </div>
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-display font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Icon name="Send" size={15} />
                      Отправить обращение
                    </button>
                  </div>
                </div>

                {/* Quick contacts */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "MessageSquare", label: "Telegram", sub: "@support", color: "from-blue-500 to-cyan-500" },
                    { icon: "Mail", label: "Email", sub: "help@company.ru", color: "from-purple-500 to-pink-500" },
                  ].map((c) => (
                    <div key={c.label} className="glass rounded-2xl p-4 hover-lift cursor-pointer">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
                        <Icon name={c.icon as IconName} size={18} className="text-white" />
                      </div>
                      <p className="font-display font-bold text-sm text-foreground">{c.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                  <Icon name="HelpCircle" size={20} className="text-cyan-400" />
                  Частые вопросы
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      className={`glass rounded-2xl overflow-hidden transition-all duration-300 hover-lift ${
                        openFaq === i ? "neon-border" : ""
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-display font-semibold text-sm text-foreground pr-4">{faq.q}</span>
                        <Icon
                          name="ChevronDown"
                          size={16}
                          className={`text-purple-400 shrink-0 transition-transform duration-300 ${
                            openFaq === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in border-t border-white/8 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Status card */}
                <div className="mt-5 glass rounded-2xl p-5 hover-lift">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <p className="font-display font-bold text-sm text-foreground">Все системы работают</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Проверено: сегодня в 10:00 МСК</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {["API", "Сайты", "База данных"].map((s) => (
                      <div key={s} className="bg-green-500/10 border border-green-500/20 rounded-lg py-1.5 px-2 text-center">
                        <p className="text-xs text-green-400 font-display font-semibold">{s}</p>
                        <p className="text-[10px] text-green-400/70 mt-0.5">OK</p>
                      </div>
                    ))}
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