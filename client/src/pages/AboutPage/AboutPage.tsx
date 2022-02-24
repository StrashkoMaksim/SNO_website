import MainLayout from "../../components/MainLayout/MainLayout";
import styles from "./AboutPage.module.scss"
import cn from "classnames";
import Tkachenko from "../../assets/img/Tkachenko.svg"
import wave from "../../assets/img/(About)Wave.svg"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../components/DefaultButton/DefaultButton";

const AboutPage = () => {
    return (
        <MainLayout>
            <section className={cn('section')}>
                <div className={cn('container')}>
                    <article className={styles.About}>
                        <div className={styles.About__Block}>
                            <div className={styles.About__MainInfo}>
                                <div className={styles.About__MainInfo__Title}>
                                    <p className={styles.Bold}>студенческое</p>
                                    <p className={styles.Bold}>научное общество</p>
                                </div>
                                <div className={styles.About__MainInfo__Achievements}>
                                    <div className={styles.About__MainInfo__Achievements__Single}>
                                        <p className={cn(styles.BigNumber, styles.Regular)}>20</p>
                                        <p className={cn(styles.AchievementInfo, styles.Light)}>научных кружков</p>
                                    </div>
                                    <div className={styles.About__MainInfo__Achievements__Single}>
                                        <p className={cn(styles.BigNumber, styles.Regular)}>56</p>
                                        <p className={cn(styles.AchievementInfo, styles.Light)}>лет истории</p>
                                    </div>
                                    <div className={styles.About__MainInfo__Achievements__Single}>
                                        <p className={cn(styles.BigNumber, styles.Regular)}>58</p>
                                        <p className={cn(styles.AchievementInfo, styles.Light)}>побед в конкурсах</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.About__BossBlock}>
                                <img src={Tkachenko} className={styles.About__BossBlock__Img} />
                                <div className={styles.About__BossBlock__FIO}>
                                    <p className={styles.Regular}>Ткаченко</p>
                                    <p className={styles.Light}>Александр Зосимович</p>
                                </div>
                                <p className={cn(styles.About__BossBlock__Position, styles.Thin)}>начальник СНО</p>
                            </div>
                            <img className={styles.Wave} src={wave} alt="" />
                        </div>
                        <div className={cn(styles.About__Block, styles.Stories)}>
                            <div className={styles['Story-Left']}>
                                <p className={styles.Regular}>Первая научная конференция студентов ХабИИЖТ состоялась 18 апреля 1942 года, и мы считаем
                                    эту дату началом студенческой науки в университете. Официально организация Студенческого
                                    научного общества в ХабИИЖТе утверждена в 1966 году.</p>
                                <p className={styles.Regular}>
                                    Каждый студент ДВГУПС знает, что у него есть возможность реализовать себя в науке.
                                    Ректорат помогает и находит средства для направления наших студентов в другие города для участия
                                    в олимпиадах, конференциях и конкурсах.
                                </p>
                                <p className={styles.Regular}>
                                    Для студентов это не только возможность показать себя и
                                    проверить свои силы, но и в очередной раз доказать, что «Железка» лучше всех.
                                </p>
                            </div>
                            <div className={styles['Story-Right']}>
                                <p className={styles.Regular}>
                                    Практически на каждой кафедре есть научный кружок.
                                    Благодаря наставникам, нашим ведущим преподавателям, студенты получают первое представление о методике
                                    проведения научного исследования, его первые результаты, которые анализируют со своим научным руководителем.
                                </p>

                                <p className={styles.Regular}>Некоторых студентов это задевает за живое, им уже хочется большего, хочется выйти на новый уровень
                                    и начать заниматься еще больше.</p>
                                <DefaultButton text="Узнать о кружках больше" style={ButtonStyles.outlined} type={ButtonTypes.button} />
                            </div>
                        </div>
                    </article>
                </div>
            </section>

        </MainLayout>
    )
}

export default AboutPage;