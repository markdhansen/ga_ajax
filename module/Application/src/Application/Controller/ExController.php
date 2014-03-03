<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class ExController extends AbstractActionController
{
    public function indexAction() {
        header("Location: /");
		exit();
    }
    public function singlePageFunnelAction() {
        return new ViewModel();
    }
    public function singlePageFunnelFrameAction() {
		$this->layout()->setTemplate('layout/frame.phtml');
        return new ViewModel();
    }
}
