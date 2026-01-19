import React from 'react'
import Link from 'next/link'

const Nav = ({ categories }) => {
  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                Strapi Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {categories.map(category => {
              return (
                <li key={category.id}>
                  <Link
                    as={`/category/${category.id}`}
                    href="/category/[id]"
                    className="uk-link-reset">
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav
