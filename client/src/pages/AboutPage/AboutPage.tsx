import styles from "./AboutPage.module.scss"
import cn from "classnames";
import Tkachenko from "../../assets/img/Tkachenko.svg"
import wave from "../../assets/img/(About)Wave.svg"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../components/DefaultButton/DefaultButton";

const AboutPage = () => {
    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <article className={styles.About}>
                    <div className={cn(styles.About__Block, styles.TitleBlock)}>
                        <div className={styles.About__Block__Subblock}>
                            <div className={styles.Title}>
                                <p className={styles.Bold}>студенческое</p>
                                <p className={styles.Bold}>научное общество</p>
                            </div>
                            <div className={styles.Achievements}>
                                <div className={styles.Achievements__Single}>
                                    <p className={cn(styles.BigNumber, styles.Regular)}>20</p>
                                    <p className={cn(styles.AchievementInfo, styles.Light)}>научных кружков</p>
                                </div>
                                <div className={styles.Achievements__Single}>
                                    <p className={cn(styles.BigNumber, styles.Regular)}>56</p>
                                    <p className={cn(styles.AchievementInfo, styles.Light)}>лет истории</p>
                                </div>
                                <div className={styles.Achievements__Single}>
                                    <p className={cn(styles.BigNumber, styles.Regular)}>58</p>
                                    <p className={cn(styles.AchievementInfo, styles.Light)}>побед в конкурсах</p>
                                </div>
                            </div>
                        </div>
                        <div className={cn(styles.About__BossBlock, styles.About__Block__Subblock)}>
                            <img src={Tkachenko} className={styles.About__BossBlock__Img} />
                            <div className={styles.About__BossBlock__FIO}>
                                <p className={styles.Regular}>Ткаченко</p>
                                <p className={styles.Light}>Александр Зосимович</p>
                            </div>
                            <p className={cn(styles.About__BossBlock__Position, styles.Thin)}>начальник СНО</p>
                        </div>
                        <img className={styles.Wave} src={wave} alt="" />
                    </div>
                    <div className={cn(styles.About__Block, styles.Stories, styles.underWave)}>
                        <div className={cn(styles['Story-Left'], styles.About__Block__Subblock)}>
                            <p className={cn(styles.Regular, styles.Paragraph)}>Первая научная конференция студентов ХабИИЖТ состоялась 18 апреля 1942 года, и мы считаем
                                эту дату началом студенческой науки в университете. Официально организация Студенческого
                                научного общества в ХабИИЖТе утверждена в 1966 году.</p>
                            <p className={cn(styles.Regular, styles.Paragraph)}>
                                Каждый студент ДВГУПС знает, что у него есть возможность реализовать себя в науке.
                                Ректорат помогает и находит средства для направления наших студентов в другие города для участия
                                в олимпиадах, конференциях и конкурсах.
                            </p>
                            <p className={cn(styles.Regular, styles.Paragraph)}>
                                Для студентов это не только возможность показать себя и
                                проверить свои силы, но и в очередной раз доказать, что «Железка» лучше всех.
                            </p>
                        </div>
                        <div className={cn(styles['Story-Right'], styles.About__Block__Subblock)}>
                            <p className={cn(styles.Regular, styles.Paragraph)}>
                                Практически на каждой кафедре есть научный кружок.
                                Благодаря наставникам, нашим ведущим преподавателям, студенты получают первое представление о методике
                                проведения научного исследования, его первые результаты, которые анализируют со своим научным руководителем.
                            </p>

                            <p className={cn(styles.Regular, styles.Paragraph)}>Некоторых студентов это задевает за живое, им уже хочется большего, хочется выйти на новый уровень
                                и начать заниматься еще больше.</p>
                            <DefaultButton text="Узнать о кружках больше" style={ButtonStyles.outlined} type={ButtonTypes.button} />
                        </div>
                        <img className={styles.Wave} id={styles.waveWhite} src={wave} alt="" />
                    </div>

                    <div className={cn(styles.About__Block, styles.underWave)}>
                        <div className={cn(styles['Story-Left'], styles.About__Block__Subblock)}>
                            <h2>все преподаватели ДВГУПС так или иначе прошли школу СНО</h2>
                            <p className={cn(styles.Regular, styles.Paragraph)}>Проректор по научной работе Сергей Анатольевич Кудрявцев начинал со студенческой науки.
                                Встречаясь со студентами, он часто говорит о том, что его первая научная публикация,
                                первая награда была еще в студенчестве. Такие достижения вдохновляют и дают толчок для развития.
                            </p>
                        </div>
                        <div className={cn(styles['Story-Right'], styles.About__Block__Subblock)}>
                            <p className={cn(styles.Regular, styles.Paragraph)}>
                                Трудно найти сравнение для той энергии, того позитива студентов, которые увлечены любимым делом.
                            </p>
                            <p className={cn(styles.Regular, styles.Paragraph)}>
                                Можно назвать много примеров того, как студенты самостоятельно организуют и проводят научные мероприятия.
                            </p>
                            <p className={cn(styles.Regular, styles.Paragraph)}>
                                СНО – это улей, в который с каждой кафедры, с каждого института студенты приносят те идеи и разработки,
                                которые в дальнейшем и реализуются в большой науке в том числе.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </section >
    )
}

export default AboutPage;