import { useState } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconName = any;

type Tab = "profile" | "subscriptions" | "support";
type ProfileTab = "info" | "password";

const tabs = [
  { id: "profile" as Tab, label: "Мои данные", icon: "User" },
  { id: "subscriptions" as Tab, label: "Подписка", icon: "Star" },
  { id: "support" as Tab, label: "Поддержка", icon: "MessageCircle" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profileTab, setProfileTab] = useState<ProfileTab>("info");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [supportSent, setSupportSent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const daysTotal = 30;
  const daysUsed = 18;
  const daysLeft = daysTotal - daysUsed;
  const progressPct = Math.round((daysLeft / daysTotal) * 100);

  function handleSave() {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="min-h-screen page-bg flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className={`
        sidebar-logosha fixed md:relative z-40 md:z-auto
        w-72 shrink-0 min-h-screen flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>

        {/* Logo */}
        <div className="px-6 pt-7 pb-5 border-b border-[rgba(244,113,74,0.12)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f4714a] to-[#f7a8b8] flex items-center justify-center shadow-sm">
                <span className="text-white text-lg">🦋</span>
              </div>
              <div>
                <p className="font-display font-black text-lg leading-tight text-[#e05530]">Логоша</p>
                <p className="text-[11px] text-muted-foreground -mt-0.5">Личный кабинет</p>
              </div>
            </div>
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-[rgba(244,113,74,0.08)] text-muted-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <Icon name="X" size={18} />
            </button>
          </div>
        </div>

        {/* User */}
        <div className="px-5 py-4 border-b border-[rgba(244,113,74,0.1)]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f4714a] to-[#f7a8b8] flex items-center justify-center text-white font-display font-black text-base shadow-sm">
              АП
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-sm text-foreground truncate">Анна Петрова</p>
              <p className="text-xs text-muted-foreground truncate">anna@example.com</p>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            Аккаунт активен
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-display font-semibold text-sm transition-all duration-200 text-left ${
                activeTab === tab.id
                  ? "nav-active"
                  : "text-muted-foreground hover:text-foreground hover:bg-[rgba(244,113,74,0.06)]"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-br from-[#f4714a] to-[#f7a8b8]"
                  : "bg-[rgba(244,113,74,0.08)]"
              }`}>
                <Icon
                  name={tab.icon as IconName}
                  size={15}
                  className={activeTab === tab.id ? "text-white" : "text-[#f4714a]"}
                />
              </div>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Subscription mini-card */}
        <div className="px-4 pb-2">
          <div className="p-4 rounded-2xl bg-[#fde8df] border border-[rgba(244,113,74,0.2)]">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-display font-bold text-[#e05530]">Тариф «Специалист»</p>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">Активен</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-2.5">Осталось {daysLeft} из {daysTotal} дней</p>
            <div className="w-full h-1.5 bg-[rgba(244,113,74,0.15)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f4714a] to-[#f7a8b8] transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-[rgba(244,113,74,0.1)]">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-display font-semibold text-sm text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
            <Icon name="LogOut" size={15} />
            Выйти из аккаунта
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 min-h-screen overflow-y-auto">

        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-[rgba(244,113,74,0.12)] px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-[rgba(244,113,74,0.08)] text-[#f4714a]"
          >
            <Icon name="Menu" size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg">🦋</span>
            <span className="font-display font-black text-[#e05530]">Логоша</span>
          </div>
          <div className="w-9" />
        </div>

        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">

          {/* Page header */}
          <div className="mb-7 animate-fade-in-up">
            <p className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-1">
              {tabs.find(t => t.id === activeTab)?.label}
            </p>
            <h1 className="text-2xl md:text-3xl font-display font-black gradient-text leading-tight">
              {activeTab === "profile" && "Мои данные"}
              {activeTab === "subscriptions" && "Моя подписка"}
              {activeTab === "support" && "Написать нам"}
            </h1>
          </div>

          <div className="animate-slide-tab" key={activeTab}>

            {/* ===== МОИ ДАННЫЕ ===== */}
            {activeTab === "profile" && (
              <div className="space-y-5">

                {/* Успешное сохранение */}
                {saved && (
                  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-display font-semibold animate-fade-in">
                    <Icon name="CheckCircle2" size={18} className="text-emerald-500 shrink-0" />
                    Данные успешно сохранены!
                  </div>
                )}

                {/* Карточка контактных данных */}
                <div className="card-logosha p-6 md:p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#fde8df] flex items-center justify-center">
                        <Icon name="User" size={17} className="text-[#f4714a]" />
                      </div>
                      <h2 className="font-display font-bold text-base text-foreground">Контактные данные</h2>
                    </div>
                    {!editing ? (
                      <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl btn-secondary text-sm font-display font-semibold"
                      >
                        <Icon name="Pencil" size={13} />
                        Редактировать
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditing(false)}
                          className="px-4 py-2 rounded-xl text-sm font-display font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        >
                          Отмена
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary text-sm font-display font-semibold"
                        >
                          <Icon name="Check" size={13} />
                          Сохранить
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">ФИО</label>
                      {editing ? (
                        <input
                          className="input-logosha"
                          defaultValue="Петрова Анна Сергеевна"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-[#fafafa] border border-border rounded-xl text-sm text-foreground font-medium">
                          Петрова Анна Сергеевна
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Телефон</label>
                      {editing ? (
                        <input
                          className="input-logosha"
                          defaultValue="+7 (900) 123-45-67"
                          type="tel"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-[#fafafa] border border-border rounded-xl text-sm text-foreground font-medium">
                          +7 (900) 123-45-67
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email</label>
                      {editing ? (
                        <input
                          className="input-logosha"
                          defaultValue="anna@example.com"
                          type="email"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-[#fafafa] border border-border rounded-xl text-sm text-foreground font-medium">
                          anna@example.com
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Карточка смены пароля */}
                <div className="card-logosha p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-[#fde8df] flex items-center justify-center">
                      <Icon name="Lock" size={17} className="text-[#f4714a]" />
                    </div>
                    <h2 className="font-display font-bold text-base text-foreground">Смена пароля</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Новый пароль</label>
                      <input
                        type="password"
                        placeholder="Введите новый пароль"
                        className="input-logosha"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Повторите пароль</label>
                      <input
                        type="password"
                        placeholder="Повторите новый пароль"
                        className="input-logosha"
                      />
                    </div>
                    <div className="pt-1 flex items-start gap-2 p-3 rounded-xl bg-[#fde8df] border border-[rgba(244,113,74,0.15)]">
                      <Icon name="Info" size={14} className="text-[#f4714a] mt-0.5 shrink-0" />
                      <p className="text-xs text-[#c0532e]">Минимум 8 символов, одна заглавная буква и цифра</p>
                    </div>
                    <button className="btn-primary px-6 py-3 rounded-xl font-display font-bold text-sm flex items-center gap-2">
                      <Icon name="KeyRound" size={14} />
                      Сохранить новый пароль
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ПОДПИСКА ===== */}
            {activeTab === "subscriptions" && (
              <div className="space-y-5">

                {/* Главная карточка подписки */}
                <div className="card-logosha overflow-hidden">
                  <div className="bg-gradient-to-r from-[#f4714a] to-[#f7a8b8] px-6 md:px-8 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-white/90 bg-white/20 border border-white/30 rounded-full px-3 py-1 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                          Активна
                        </span>
                        <h2 className="font-display font-black text-2xl text-white mb-1">Тариф «Специалист»</h2>
                        <p className="text-white/80 text-sm">Полный доступ ко всем играм и материалам</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-display font-black text-3xl text-white">990 ₽</p>
                        <p className="text-white/70 text-xs">в месяц</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 md:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {[
                        { label: "Начало", value: "18 апреля 2026", icon: "CalendarDays" },
                        { label: "Окончание", value: "18 мая 2026", icon: "CalendarCheck" },
                        { label: "Осталось", value: `${daysLeft} дней`, icon: "Clock" },
                      ].map((item) => (
                        <div key={item.label} className="p-4 rounded-xl bg-[#fafafa] border border-border">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Icon name={item.icon as IconName} size={14} className="text-[#f4714a]" />
                            <span className="text-[11px] text-muted-foreground font-display font-semibold uppercase tracking-wider">{item.label}</span>
                          </div>
                          <p className="font-display font-bold text-sm text-foreground">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Срок действия</span>
                        <span className="font-display font-bold text-foreground">{daysLeft} из {daysTotal} дней</span>
                      </div>
                      <div className="w-full h-2.5 bg-[rgba(244,113,74,0.1)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#f4714a] to-[#f7a8b8] transition-all duration-700"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="btn-primary px-6 py-3 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 flex-1">
                        <Icon name="RefreshCw" size={15} />
                        Продлить подписку
                      </button>
                      <button className="btn-secondary px-6 py-3 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2">
                        <Icon name="Layers" size={15} />
                        Сменить тариф
                      </button>
                    </div>
                  </div>
                </div>

                {/* Преимущества */}
                <div className="card-logosha p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-[#fde8df] flex items-center justify-center">
                      <Icon name="Sparkles" size={17} className="text-[#f4714a]" />
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground">Что входит в подписку</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: "Gamepad2", label: "200+ игр и упражнений", desc: "Все разделы без ограничений" },
                      { icon: "FileText", label: "Методические материалы", desc: "Карточки, схемы, распечатки" },
                      { icon: "Download", label: "Скачивание материалов", desc: "PDF, изображения, шаблоны" },
                      { icon: "BookOpen", label: "Обучающие курсы", desc: "Для логопедов и родителей" },
                      { icon: "Headphones", label: "Приоритетная поддержка", desc: "Ответ в течение 2 часов" },
                      { icon: "RefreshCw", label: "Регулярные обновления", desc: "Новые игры каждую неделю" },
                    ].map((f) => (
                      <div key={f.label} className="flex items-start gap-3 p-4 rounded-xl bg-[#fafafa] border border-border hover:border-[rgba(244,113,74,0.25)] hover:bg-[#fff5f2] transition-all">
                        <div className="w-9 h-9 rounded-xl bg-[#fde8df] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon name={f.icon as IconName} size={16} className="text-[#f4714a]" />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-sm text-foreground">{f.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* История платежей */}
                <div className="card-logosha p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-[#fde8df] flex items-center justify-center">
                      <Icon name="Receipt" size={17} className="text-[#f4714a]" />
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground">История платежей</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { date: "18 апр 2026", amount: "990 ₽", status: "Оплачено", period: "апр–май 2026" },
                      { date: "18 мар 2026", amount: "990 ₽", status: "Оплачено", period: "мар–апр 2026" },
                      { date: "18 фев 2026", amount: "990 ₽", status: "Оплачено", period: "фев–мар 2026" },
                    ].map((p) => (
                      <div key={p.date} className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#fafafa] border border-border hover:bg-[#fff5f2] transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                            <Icon name="CheckCircle2" size={14} className="text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-display font-semibold text-sm text-foreground">{p.date}</p>
                            <p className="text-xs text-muted-foreground">{p.period}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-sm text-foreground">{p.amount}</p>
                          <span className="text-xs text-emerald-600 font-medium">{p.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== ПОДДЕРЖКА ===== */}
            {activeTab === "support" && (
              <div className="space-y-5">

                {/* Форма */}
                <div className="card-logosha p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-[#fde8df] flex items-center justify-center">
                      <Icon name="MessageCircle" size={17} className="text-[#f4714a]" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-base text-foreground">Написать нам</h2>
                      <p className="text-xs text-muted-foreground">Ответим в течение нескольких часов</p>
                    </div>
                  </div>

                  {!supportSent ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Тема обращения</label>
                        <select className="input-logosha appearance-none cursor-pointer">
                          <option value="">Выберите тему</option>
                          <option value="billing">Вопрос по оплате</option>
                          <option value="tech">Техническая проблема</option>
                          <option value="account">Вопрос по аккаунту</option>
                          <option value="content">Вопрос по контенту</option>
                          <option value="other">Другое</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-2">Сообщение</label>
                        <textarea
                          rows={5}
                          placeholder="Опишите ваш вопрос или проблему..."
                          className="input-logosha resize-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => setSupportSent(true)}
                          className="btn-primary px-6 py-3 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 flex-1"
                        >
                          <Icon name="Send" size={14} />
                          Отправить
                        </button>
                        <button className="btn-secondary px-6 py-3 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2">
                          <Icon name="Trash2" size={14} />
                          Очистить
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-2xl bg-[#fde8df] border border-[rgba(244,113,74,0.2)] flex items-center justify-center mx-auto mb-4 text-3xl">
                        🎉
                      </div>
                      <p className="font-display font-black text-xl text-foreground mb-1.5">Сообщение отправлено!</p>
                      <p className="text-sm text-muted-foreground mb-5">Мы получили ваш запрос и ответим в ближайшее время.<br/>Номер обращения: <span className="text-[#f4714a] font-bold">#LG-3847</span></p>
                      <button
                        onClick={() => setSupportSent(false)}
                        className="btn-secondary px-6 py-2.5 rounded-xl font-display font-semibold text-sm"
                      >
                        Новое обращение
                      </button>
                    </div>
                  )}
                </div>

                {/* Другие способы связи */}
                <div className="card-logosha p-6 md:p-7">
                  <h3 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-[#f4714a]" />
                    Другие способы связи
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: "Send", label: "Telegram", value: "@logosha_support", desc: "Быстрые ответы", color: "bg-blue-50 border-blue-200", iconColor: "text-blue-500" },
                      { icon: "MessageSquare", label: "WhatsApp", value: "+7 (900) 000-00-00", desc: "Голос и чат", color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-500" },
                      { icon: "Mail", label: "Email", value: "help@logosha.ru", desc: "Официальные запросы", color: "bg-[#fde8df] border-[rgba(244,113,74,0.2)]", iconColor: "text-[#f4714a]" },
                      { icon: "Phone", label: "Телефон", value: "+7 (800) 555-00-11", desc: "Пн–Пт, 9–18 МСК", color: "bg-violet-50 border-violet-200", iconColor: "text-violet-500" },
                    ].map((c) => (
                      <div key={c.label} className={`flex items-center gap-3 p-4 rounded-xl border ${c.color} hover-lift cursor-pointer transition-all`}>
                        <div className={`w-10 h-10 rounded-xl ${c.color} border flex items-center justify-center shrink-0`}>
                          <Icon name={c.icon as IconName} size={18} className={c.iconColor} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-bold text-sm text-foreground">{c.label}</p>
                          <p className="text-xs text-foreground/70 truncate">{c.value}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{c.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Баннер */}
                <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#f4714a] to-[#f7a8b8] p-6 flex items-center gap-5">
                  <div className="text-4xl shrink-0">💬</div>
                  <div>
                    <p className="font-display font-black text-xl text-white mb-1">Мы всегда рядом!</p>
                    <p className="text-white/85 text-sm">Поддержка работает 24/7 — пишите в любое время, и мы с радостью поможем вам и вашим деткам.</p>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}