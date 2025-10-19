import { useEffect } from 'react';

import { SKILLS } from '../gameEngine/constants/skills';
import GameEngine from '../gameEngine/GameEngine';
import { ESkillName } from '../gameEngine/types';

export const Game = () => {
  useEffect(() => {
    new GameEngine();
  }, []);

  return (
    <>
      <div id="container">
        <div id="menu">
          <div className="menu-btn btn-simple" data-skill={ESkillName.hacking}>
            {SKILLS[ESkillName.hacking].name}
          </div>
          <div className="menu-btn btn-simple" data-skill={ESkillName.spy}>
            {SKILLS[ESkillName.spy].name}
          </div>
          <div className="menu-btn btn-simple" data-skill={ESkillName.mercenary}>
            {SKILLS[ESkillName.mercenary].name}
          </div>
          <div className="menu-btn btn-play">Старт/Отмена</div>
        </div>
        <canvas id="game" width="400" height="200"></canvas>
      </div>
    </>
  );
};
