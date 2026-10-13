
"use client";

import { useEffect, useMemo, useState } from "react";

const trainingDays = [
  {
    day: 1,
    title: "Affiliate Marketing Introduction",
    description:
      "Affiliate marketing ka basic concept aur earning system samjho.",
    videos: [
      {
        id: 1,
        title: "Affiliate Marketing Kya Hai?",
        video: "https://www.youtube.com/embed/inz6bMu3o24",
      },
      {
        id: 2,
        title: "Why LearnIND (Millionaire Mindset)?",
        video: "https://www.youtube.com/embed/rAMgpuufdoc",
      },
    ],
  },
  {
    day: 2,
    title: "Affiliate Dashboard Samjho",
    description:
      "Dashboard ke important sections, earnings aur referral system ko samjho.",
    videos: [
      {
        id: 1,
        title: "All About LearnIND",
        video: "https://www.youtube.com/embed/0O3UarY0fLI",
      },
    ],
  },
  {
    day: 3,
    title: "Product Aur Course Ko Samjho",
    description:
      "Courses ko samjho aur customer ko unki value properly explain karna sikho.",
    videos: [
      {
        id: 1,
        title: "Profile Building Intro",
        video: "https://www.youtube.com/embed/wDdwuJ6A88Q",
      },
      {
        id: 2,
        title: "Create a better UserName",
        video: "https://www.youtube.com/embed/qXNISGyYgiE",
      },
      {
        id: 3,
        title: "How to click a attractive profile picture",
        video: "https://www.youtube.com/embed/-ahTt-qcbJs",
      },
      {
        id: 4,
        title: "How to click a attractive profile picture part 2",
        video: "https://www.youtube.com/embed/A7QQStMIWqg",
      },
      {
        id: 5,
        title: "How to create a better bio for your instagram",
        video: "https://www.youtube.com/embed/PT7UOhl5Ztk",
      },
    ],
  },
  {
    day: 4,
    title: "WhatsApp Se Promotion",
    description:
      "WhatsApp ka use karke professional promotion aur communication sikho.",
    videos: [
      {
        id: 1,
        title: "What is Content Creation",
        video: "https://www.youtube.com/embed/EQ3VPQHsuuk",
      },
      {
        id: 2,
        title: "Future of Content Creation",
        video: "https://www.youtube.com/embed/yISePeSE9XY",
      },
      {
        id: 3,
        title: "Clear Your Why????",
        video: "https://www.youtube.com/embed/kkwhSZkBWsM",
      },
      {
        id: 4,
        title: "Find Your Niche",
        video: "https://www.youtube.com/embed/-9SNSxYkxwQ",
      },
      {
        id: 5,
        title: "Types of Content",
        video: "https://www.youtube.com/embed/u61yQ9gLvN4",
      },
      {
        id: 6,
        title: "Content Research",
        video: "https://www.youtube.com/embed/DxhCRq8pQ6g",
      },
      {
        id: 7,
        title: "How to shoot",
        video: "https://www.youtube.com/embed/IiCDcxSV4BY",
      },
      {
        id: 8,
        title: "Let's know about hooks",
        video: "https://www.youtube.com/embed/Q0eOu-3Nwks",
      },
      {
        id: 9,
        title: "What is story status marketing",
        video: "https://www.youtube.com/embed/lxZJo0oHPJU",
      },
    ],
  },
  {
    day: 5,
    title: "Instagram Se Leads Lana",
    description:
      "Instagram profile, stories aur reels ke through potential customers tak pahucho.",
    videos: [
      {
        id: 1,
        title: "All about Leads Generation",
        video: "https://www.youtube.com/embed/R-iFuw35Q9c",
      },
      {
        id: 2,
        title: "How to Generate Leads Through DM",
        video: "https://www.youtube.com/embed/rDOBmg4whHM",
      },
    ],
  },
  {
    day: 6,
    title: "Content Aur Reels Strategy",
    description:
      "Audience ko attract karne wala content aur reels banana sikho.",
    videos: [
      {
        id: 1,
        title: "What is Meta Ads By Shivank Pandey",
        video: "https://www.youtube.com/embed/vU8poa6Qkp0",
      },
      {
        id: 2,
        title: "How to make instagram for facebook page By Shivank Pandey",
        video: "https://www.youtube.com/embed/FGDpkQv4M3k",
      },
      {
        id: 3,
        title: "How to Determine Quality and Targeting",
        video: "https://www.youtube.com/embed/MckO7KqhVEw",
      },
      {
        id: 4,
        title: "Lead Conversion process by shivank pandey",
        video: "https://www.youtube.com/embed/GAiPfnmZqpw",
      },
      {
        id: 5,
        title: "How to add budget in meta Ads",
        video: "https://www.youtube.com/embed/36Nqm8vOWRw",
      },
      {
        id: 6,
        title: "All about Meta Ads By S shekhar",
        video: "https://www.youtube.com/embed/5r82_hS090s",
      },
    ],
  },
  {
    day: 7,
    title: "Lead Se Customer Tak",
    description:
      "Interested lead ko customer tak properly guide karna sikho.",
    videos: [
      {
        id: 1,
        title: "Invitation Into By Naman chaurasiya",
        video: "https://www.youtube.com/embed/WFOPuBtWB20",
      },
      {
        id: 2,
        title: "What is Invitation",
        video: "https://www.youtube.com/embed/OyTHSFxVnKY",
      },
      {
        id: 3,
        title: "Imorortant points during Invitation",
        video: "https://www.youtube.com/embed/T40nUMjUMJ8",
      },
      {
        id: 4,
        title: "Types of Invitation",
        video: "https://www.youtube.com/embed/d99PjNcXlrk",
      },
      {
        id: 5,
        title: "Types of Invitation Part 2",
        video: "https://www.youtube.com/embed/RiCd7ro-qvc",
      },
      {
        id: 6,
        title: "Leads Closing Process",
        video: "https://www.youtube.com/embed/t0yrhLnqWW8",
      },
      {
        id: 7,
        title: "Leads Closing Process Part 2",
        video: "https://www.youtube.com/embed/TRVviGe8cLc",
      },
      {
        id: 8,
        title: "What is Need identification",
        video: "https://www.youtube.com/embed/hEkXmIXNI8g",
      },
    ],
  },
  {
    day: 8,
    title: "Follow-up Aur Communication",
    description:
      "Professional communication aur effective follow-up ka process sikho.",
    videos: [
      {
        id: 1,
        title: "Objection Handling",
        video: "https://www.youtube.com/embed/5BOKkCrQmzM",
      },
      {
        id: 2,
        title: "Objection Handling Part 2",
        video: "https://www.youtube.com/embed/ReCm5JWNSoo",
      },
      {
        id: 3,
        title: "Objection Handling Part 3",
        video: "https://www.youtube.com/embed/W6nDbGxCwz8",
      },
      {
        id: 4,
        title: "Objection Handling Part 4",
        video: "https://www.youtube.com/embed/VpZux_k6L9A",
      },
    ],
  },
  {
    day: 9,
    title: "Common Mistakes Se Bacho",
    description:
      "Affiliate marketing ki common mistakes aur unsafe promotion methods ko samjho.",
    videos: [
      {
        id: 1,
        title: "What is HTC High Ticket Closing",
        video: "https://www.youtube.com/embed/aI0zgOe6iSc",
      },
      {
        id: 2,
        title: "High Ticket Closing Process",
        video: "https://www.youtube.com/embed/gDwP6w3svDM",
      },
      {
        id: 3,
        title: "How to Pitch higher packages",
        video: "https://www.youtube.com/embed/PzxcGko0AcM",
      },
    ],
  },
  {
    day: 10,
    title: "Complete Affiliate Growth Strategy",
    description:
      "Pichhle days me seekhi hui cheezon ko combine karke complete strategy samjho.",
    videos: [
      {
        id: 1,
        title: "Grand Team Meeting",
        video: "https://www.youtube.com/embed/VC5xCBxPQm8",
      },
      {
        id: 2,
        title: "Girls special Meeting",
        video: "https://www.youtube.com/embed/DTJw_-3n7Ko",
      },
      {
        id: 3,
        title: "How to get First Sale (Most Important)",
        video: "https://www.youtube.com/embed/GZSzc_bVBj8",
      },
    ],
  },
];

const STORAGE_KEY = "learnind-training-progress-v1";

export default function AffiliateTrainingPage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeVideos, setActiveVideos] = useState({});
  const [completedVideos, setCompletedVideos] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        setCompletedVideos(parsed.completedVideos || {});
        setActiveVideos(parsed.activeVideos || {});
      }
    } catch (error) {
      console.error("Could not restore training progress:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ completedVideos, activeVideos })
      );
    } catch (error) {
      console.error("Could not save training progress:", error);
    }
  }, [completedVideos, activeVideos, loaded]);

  const currentDay =
    trainingDays.find((day) => day.day === selectedDay) || trainingDays[0];

  const activeVideoId =
    activeVideos[currentDay.day] || currentDay.videos[0]?.id;

  const activeVideo =
    currentDay.videos.find((video) => video.id === activeVideoId) ||
    currentDay.videos[0];

  const totalVideos = useMemo(
    () => trainingDays.reduce((total, day) => total + day.videos.length, 0),
    []
  );

  const completedCount = Object.values(completedVideos).filter(Boolean).length;

  const progress = totalVideos
    ? Math.min(100, Math.round((completedCount / totalVideos) * 100))
    : 0;

  function videoKey(dayNumber, videoId) {
    return `${dayNumber}-${videoId}`;
  }

  function toggleComplete() {
    if (!activeVideo) return;

    const key = videoKey(currentDay.day, activeVideo.id);

    setCompletedVideos((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  function changeDay(dayNumber) {
    setSelectedDay(dayNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });

      if (!response.ok) {
        throw new Error("Logout request failed.");
      }
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError(
        "Logout nahi ho paya. Apne project ke logout API route ko check karein."
      );
      setLoggingOut(false);
    }
  }

  const dayCompleted = currentDay.videos.filter((video) =>
    completedVideos[videoKey(currentDay.day, video.id)]
  ).length;

  const isCurrentComplete = activeVideo
    ? Boolean(completedVideos[videoKey(currentDay.day, activeVideo.id)])
    : false;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06172c] text-[#f8f9fc]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(18,59,100,0.52),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex min-h-[76px] items-center justify-between gap-4 border-b border-white/10 py-4 sm:min-h-[88px]">
          <a
            className="flex min-w-0 items-center gap-3"
            href="/training"
            aria-label="LearnIND Training home"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-[#d4a72c]/40 bg-[#d4a72c]/10 text-xl font-extrabold text-[#f3d988] shadow-[0_0_26px_rgba(212,167,44,0.12)]">
              L
            </span>
            <span className="flex min-w-0 flex-col">
              <strong className="text-lg font-extrabold leading-tight tracking-tight text-white">
                LearnIND
              </strong>
              <small className="mt-1 text-[9px] font-bold tracking-[0.19em] text-[#a6b2c3]">
                LEARN THEN EARN
              </small>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <span className="hidden items-center gap-2 text-sm font-semibold text-[#c5cfdd] sm:flex">
              <span className="size-2 rounded-full bg-[#d4a72c]" />
              Affiliate Training
            </span>

            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 text-sm font-bold text-white transition hover:border-[#d4a72c]/60 hover:bg-[#d4a72c]/10 disabled:cursor-wait disabled:opacity-60 sm:px-4"
              onClick={handleLogout}
              disabled={loggingOut}
              type="button"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        {logoutError && (
          <p
            className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            {logoutError}
          </p>
        )}

        <section className="grid items-center gap-8 py-10 sm:gap-10 sm:py-14 lg:min-h-[340px] lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.22em] text-[#f3d988]">
              <span className="h-px w-6 bg-[#d4a72c]" />
              YOUR LEARNING JOURNEY
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Affiliate <span className="text-[#e3ba4f]">Training</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#a6b2c3] sm:text-base">
              Learn at your own pace. Watch every lesson, track your progress,
              and build your skills one day at a time.
            </p>

            <div className="mt-7 grid max-w-lg grid-cols-3 gap-3 sm:gap-5">
              <StatCard value={trainingDays.length} label="Training days" />
              <StatCard value={totalVideos} label="Video lessons" />
              <StatCard value={`${progress}%`} label="Completed" />
            </div>
          </div>

          <div
            className="relative mx-auto grid aspect-[1.55] w-full max-w-md place-items-center lg:aspect-[1.35]"
            aria-hidden="true"
          >
            <div className="absolute size-[min(72vw,290px)] rounded-full border border-[#d4a72c]/20 shadow-[0_0_90px_rgba(18,59,100,0.45)]" />
            <div className="relative w-[min(72%,285px)] rounded-2xl border border-[#d4a72c]/25 bg-gradient-to-br from-[#123b64] to-[#081a31] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-8">
              <span className="grid size-12 place-items-center rounded-full border border-[#f3d988]/50 bg-[#d4a72c]/10 text-lg text-[#f3d988]">
                ▶
              </span>
              <span className="mt-6 block h-2 w-4/5 rounded-full bg-white/15" />
              <span className="mt-3 block h-2 w-3/5 rounded-full bg-white/10" />
              <span className="mt-7 block text-[9px] font-extrabold tracking-[0.2em] text-[#f3d988]">
                LEARN • GROW • EARN
              </span>
            </div>
            <span className="absolute right-[13%] top-[14%] text-2xl text-[#f3d988]">
              ✦
            </span>
            <span className="absolute bottom-[16%] left-[12%] text-xl text-[#d4a72c]/70">
              ✧
            </span>
          </div>
        </section>

        <section
          className="rounded-2xl border border-white/10 bg-[#0b203b]/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-7"
          aria-label="Overall training progress"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#d4a72c]">
                YOUR PROGRESS
              </span>
              <h2 className="mt-2 text-lg font-bold text-white sm:text-xl">
                Keep the momentum going
              </h2>
            </div>
            <strong className="text-2xl font-extrabold text-[#f3d988] sm:text-3xl">
              {progress}%
            </strong>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#b88918] to-[#f3d988] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-[#a6b2c3]">
            <span>
              {completedCount} of {totalVideos} lessons completed
            </span>
            <span>{Math.max(0, totalVideos - completedCount)} left to go</span>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#d4a72c]">
                THE COURSE
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Your 10-day roadmap
              </h2>
              <p className="mt-2 text-sm text-[#a6b2c3]">
                Select a day to view its lessons and continue learning.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-[#d4a72c]/30 bg-[#d4a72c]/10 px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-[#f3d988]">
              {trainingDays.length} DAYS
            </span>
          </div>

          <nav
            className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10"
            aria-label="Training days"
          >
            {trainingDays.map((day) => {
              const finished =
                day.videos.length > 0 &&
                day.videos.every((video) =>
                  completedVideos[videoKey(day.day, video.id)]
                );

              const done = day.videos.filter(
                (video) => completedVideos[videoKey(day.day, video.id)]
              ).length;

              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => changeDay(day.day)}
                  className={`flex min-h-14 items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${
                    selectedDay === day.day
                      ? "border-[#d4a72c]/60 bg-[#d4a72c]/10"
                      : finished
                        ? "border-emerald-400/25 bg-emerald-400/5"
                        : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                  aria-pressed={selectedDay === day.day}
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold ${
                      finished
                        ? "bg-emerald-400/15 text-emerald-300"
                        : selectedDay === day.day
                          ? "bg-[#d4a72c]/20 text-[#f3d988]"
                          : "bg-white/5 text-[#a6b2c3]"
                    }`}
                  >
                    {finished ? "✓" : String(day.day).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-xs font-bold text-white">
                    Day {day.day}
                  </span>
                  <span className="text-[10px] text-[#a6b2c3]">
                    {done}/{day.videos.length}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mb-5 mt-9 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-flex rounded-full border border-[#d4a72c]/30 bg-[#d4a72c]/10 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-[#f3d988]">
                DAY {String(currentDay.day).padStart(2, "0")}
              </span>
              <h2 className="mt-3 break-words text-xl font-extrabold text-white sm:text-2xl">
                {currentDay.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#a6b2c3]">
                {currentDay.description}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <strong className="block text-lg font-extrabold text-[#f3d988]">
                {dayCompleted}/{currentDay.videos.length}
              </strong>
              <span className="text-[10px] text-[#a6b2c3]">lessons done</span>
            </div>
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]">
            <section
              className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0b203b]/80 shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
              aria-label="Video player"
            >
              <div className="aspect-video bg-black">
                {activeVideo?.video &&
                !activeVideo.video.includes("VIDEO_ID") ? (
                  <iframe
                    className="h-full w-full border-0"
                    key={activeVideo.video}
                    src={activeVideo.video}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-[#a6b2c3]">
                    <span className="text-3xl text-[#d4a72c]">▶</span>
                    <strong className="text-white">
                      Video link coming soon
                    </strong>
                    <p className="max-w-sm text-sm">
                      Add the real YouTube embed URL in trainingDays.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6">
                <div className="text-[9px] font-extrabold tracking-[0.18em] text-[#d4a72c]">
                  NOW PLAYING <span className="px-1 text-[#f3d988]">•</span>
                  DAY {currentDay.day} / VIDEO {activeVideo?.id || 1}
                </div>

                <h3 className="mt-2 break-words text-lg font-bold text-white sm:text-xl">
                  {activeVideo?.title || "Select a lesson"}
                </h3>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs text-[#a6b2c3]">
                    <span className="text-[#d4a72c]">▶</span> Video lesson
                  </span>

                  <button
                    type="button"
                    onClick={toggleComplete}
                    disabled={!activeVideo}
                    className={`min-h-10 rounded-xl border px-4 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      isCurrentComplete
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                        : "border-[#d4a72c]/40 bg-[#d4a72c]/10 text-[#f3d988] hover:bg-[#d4a72c]/20"
                    }`}
                  >
                    {isCurrentComplete ? "✓ Completed" : "Mark as complete"}
                  </button>
                </div>
              </div>
            </section>

            <aside
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b203b]/80"
              aria-label={`Day ${currentDay.day} playlist`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-5">
                <div>
                  <span className="text-[9px] font-extrabold tracking-[0.18em] text-[#d4a72c]">
                    YOUR LESSONS
                  </span>
                  <h3 className="mt-1 text-base font-bold text-white">
                    Day {currentDay.day} playlist
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-[#a6b2c3]">
                  {currentDay.videos.length} videos
                </span>
              </div>

              <div className="max-h-[520px] flex-1 space-y-1 overflow-y-auto p-2">
                {currentDay.videos.map((video, index) => {
                  const active = video.id === activeVideo?.id;
                  const done = Boolean(
                    completedVideos[videoKey(currentDay.day, video.id)]
                  );

                  return (
                    <button
                      key={`${currentDay.day}-${video.id}`}
                      type="button"
                      onClick={() =>
                        setActiveVideos((previous) => ({
                          ...previous,
                          [currentDay.day]: video.id,
                        }))
                      }
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                        active
                          ? "border-[#d4a72c]/35 bg-[#d4a72c]/10"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.035]"
                      }`}
                      aria-current={active ? "true" : undefined}
                    >
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-lg text-[10px] font-extrabold ${
                          done
                            ? "bg-emerald-400/10 text-emerald-300"
                            : active
                              ? "bg-[#d4a72c]/15 text-[#f3d988]"
                              : "bg-white/5 text-[#a6b2c3]"
                        }`}
                      >
                        {done ? "✓" : String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <strong className="block break-words text-xs font-semibold leading-5 text-white">
                          {video.title}
                        </strong>
                        <small className="mt-0.5 block text-[10px] text-[#a6b2c3]">
                          {active
                            ? "Currently playing"
                            : done
                              ? "Completed"
                              : "Video lesson"}
                        </small>
                      </span>

                      <span className="shrink-0 text-sm text-[#d4a72c]">
                        {active ? "▶" : "›"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-[10px] text-[#a6b2c3]">
                <span className="size-1.5 shrink-0 rounded-full bg-[#d4a72c]" />
                {dayCompleted === currentDay.videos.length
                  ? "Day complete — great work!"
                  : `${currentDay.videos.length - dayCompleted} lessons remaining today`}
              </div>
            </aside>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              className="min-h-11 rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-bold text-[#dce3ec] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => changeDay(selectedDay - 1)}
              disabled={selectedDay === 1}
            >
              ← Previous day
            </button>

            <span className="order-first w-full text-center text-xs text-[#a6b2c3] sm:order-none sm:w-auto">
              Day {selectedDay} of {trainingDays.length}
            </span>

            <button
              type="button"
              className="min-h-11 rounded-xl border border-[#d4a72c]/40 bg-[#d4a72c]/10 px-4 text-xs font-bold text-[#f3d988] transition hover:bg-[#d4a72c]/20 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => changeDay(selectedDay + 1)}
              disabled={selectedDay === trainingDays.length}
            >
              Next day →
            </button>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-[#a6b2c3]">
          <span className="font-extrabold tracking-wide text-white">
            LearnIND
          </span>
          <span>
            Learn then Earn <span className="text-[#d4a72c]">✦</span>
          </span>
        </footer>
      </div>
    </main>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
      <strong className="block text-2xl font-extrabold text-[#f3d988] sm:text-3xl">
        {value}
      </strong>
      <span className="mt-1 block text-[11px] text-[#a6b2c3] sm:text-xs">
        {label}
      </span>
    </div>
  );
}
