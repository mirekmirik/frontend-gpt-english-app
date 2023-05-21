import React from 'react'
import { Route, Routes } from 'react-router'
import { ROUTES } from '../../utils/routes'
import Auth from '../Auth/Auth'
import OptionLvl from '../OptionLvl/OptionLvl'
import Home from '../Home/Home'
import RequireAuth from '../RequireAuth'
import GamesCategories from '../Games/GamesCategories/GamesCategories'
import GeneralQuestions from '../Games/GamesCategories/GeneralQuestions/GeneralQuestions'
import Settings from '../Settings/Settings'
import SettingsPage from '../Settings/SettingsPage'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Home */}
            <Route path={ROUTES.HOME} element={
                <RequireAuth>
                    <Home />
                </RequireAuth>}
            />
            {/* Auth  */}
            <Route path={ROUTES.AUTH} element={<Auth />} />
            {/* Pick Option After Auth */}
            <Route path={ROUTES.OPTION_LVL} element={
                <RequireAuth>
                    <OptionLvl />
                </RequireAuth>}
            />
            {/* Games Categories */}
            <Route path={ROUTES.GAMES} element={
                <RequireAuth>
                    <GamesCategories />
                </RequireAuth>}
            />

            <Route path={ROUTES.GAME_GENERAL_QUESTION} element={<RequireAuth><GeneralQuestions /></RequireAuth>} />
            <Route path={ROUTES.SETTINGS} element={<RequireAuth><SettingsPage /></RequireAuth>} />


            </Routes>
    )
}

            export default AppRoutes