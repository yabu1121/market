'use client'

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token)
      }
    }

    // 初回レンダリング時に実行
    checkLoginStatus()

    const handleStorageChange = () => {
      checkLoginStatus()
    }

    // 'storage'が変化した場合、ログインステータスを確認する。
    window.addEventListener('storage', handleStorageChange)

    const interval = setInterval(checkLoginStatus, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
    // 監視対象 pathname
  }, [pathname])

  const handleLogout = () => {
    // tokenを消すことによりホーム画面に移動してログアウトをする。
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="md:text-2xl font-bold hover:text-gray-300 transition-colors">オークション</Link>
          <nav>
            <ul className="flex gap-6 items-center">
              <li><Link href="/" className="text-sm hover:text-gray-300 transition-colors">ホーム</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link href="/item/create" className="text-sm hover:text-gray-300 transition-colors">新規投稿</Link></li>
                  <li><button onClick={handleLogout} className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">ログアウト</button></li>
                </>
              ) : (
                <>
                  <li><Link href="/login" className="text-sm hover:text-gray-300 transition-colors">ログイン</Link></li>
                  <li><Link href="/user/register" className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">新規登録</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
