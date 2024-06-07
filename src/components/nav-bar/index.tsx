import { GiStabbedNote } from "react-icons/gi";
import { NavButton } from '../nav-button'

export const NavBar = () => {
  return (
    <nav>
        <ul className='flex  flex-col mt-10'>
            <li>
                <NavButton href='protocol11' icon={<GiStabbedNote />}>
                   Протокол 1.1
                </NavButton>
            </li>
            <li>
                <NavButton href='protocol32' icon={<GiStabbedNote />}>
                    Протокол 3.2
                </NavButton>
            </li>
        </ul>

    </nav>
  )
}
